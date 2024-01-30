/* eslint-disable react/prop-types */
function MoviesItem({ movie, allMovies }) {
    const token = localStorage.getItem('token');

    const handleDelete = async () => {
        const methods = {
            method: "DELETE",
            headers: { 
                "content-Type": "application/json", 
                "Authorization": `Bearer ${token}`
            }
        };
        console.log(movie.id);

        try {
            const response  = await fetch(`http://localhost:4000/movie/${movie.id}`, methods);
            const data = await response.json();

            if (response.ok) {
                allMovies(); // Fetch the updated list of movies after successful deletion
            } else {
                console.error('Error deleting movie:', data.error);
            }
        } catch (error) {
            console.error('Error deleting movie:', error);
        }
    };

    return (
        <li className="border-b border-t h-24 text-green flex justify-between">
            <div>
                <p>Title: {movie.title}</p>
                <p>Description: {movie.description}</p>
                <p>Runtime: {movie.runtimeMins} mins</p>
            </div>

            <div>
                <button className="bg-blue-700 rounded cursor-pointer px-1 text-white" onClick={handleDelete}> Delete </button>
            </div>
        </li>
    );
}

export default MoviesItem;
