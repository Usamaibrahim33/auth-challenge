/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import MoviesItem from "./MoviesListItem";

function MovieList() {
    const [moviesList, setmoviesList] = useState([]); // Initialize with an empty array

    
    const allMovies = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch('http://localhost:4000/movie', {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            if (!response.ok) {
                console.log('othello');
            } else {
                const data = await response.json();
                setmoviesList(data.movies); 
            }
        } catch (error) {
            console.error('Error fetching movies:', error);
        }
    }

    useEffect(() => {
        allMovies();
    }, []); 


    return (
        <div>
            <h1 className='text-3xl mt-12'>Movie List</h1>
            <button type="button " onClick={allMovies} className="bg-blue-700 text-white px-1  mt-2 hover:bg-blue-500 rounded">View Movies</button>
            {moviesList && moviesList.length > 0 ? (
                <ul className="mt-4">
                    {moviesList.map((movie) => (
                        <MoviesItem key={movie.id} movie={movie} allMovies={allMovies} />
                    ))}
                </ul>
            ) : (
                <p>No movies available. Add some movies!</p>
            )}
        </div>
    )
}

export default MovieList;
