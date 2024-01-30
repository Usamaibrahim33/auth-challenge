/* eslint-disable react/prop-types */
// import { create } from "domain";
import { useEffect, useState } from "react";

const movieForm = {
    title: localStorage.getItem('title') || '',
    description: localStorage.getItem('description') || '',
    runtimeMins: localStorage.getItem('runtimeMins') || ''
}


function MoviePage( {setmoviesList}) {
    const [movie, setMovie] = useState(movieForm);
    const [token, setToken ] = useState(localStorage.getItem('token') || '')
    const [movieError, setMovieError] = useState(null)
    const [movieCreatedNotification, setmovieCreatedNotifications] = useState(null)

    const validatingUserInput = () => {
        if (!movie.title || !movie.description || !movie.runtimeMins) {
            setMovieError('All fields are mandatory');
            return;
        }

        if (isNaN(movie.runtimeMins)) {
            setMovieError('Runtime should be a number');
            return;
        }
    }

    const handleMovieCreation = async () => {
        // if (!movie.title || !movie.description || !movie.runtimeMins) {
        //     setMovieError('All fields are mandatory');
        //     return;
        // }

        // if (isNaN(movie.runtimeMins)) {
        //     setMovieError('Runtime should be a number');
        //     return;
        // }
        validatingUserInput()

        const methods = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(movie)
        }

        try {
            const response = await fetch('http://localhost:4000/movie', methods);
            if(!response.ok) {
                const erroData = response.json();
                setmovieCreatedNotifications(erroData)

            }

            const data = await response();
            if(data.errorNoToken) {
                window.location.href = "http://localhost:5173/login"
            }
            setmovieCreatedNotifications('Movie Created Successfully!');
            console.log('yo2')
            
        } catch (error) {
            console.error('Error creating movie:', error);
            console.log('yo1')

            setmovieCreatedNotifications('An error occurred while creating the movie.');
        }    
    };


    const createMovie = async (event) => {
        event.preventDefault();
        await handleMovieCreation(movie)
        setMovie(movieForm)
    }
    

    const handleChange = (event) => {
        event.preventDefault();
        const {name, value} = event.target;
        localStorage.setItem(name, value)
        setMovie({
            ...movie, 
            [name]: value
        });
    }


    return (
        <div className=" flex justify-center items-center  mt-24" >
            <form onSubmit={createMovie} >
                {movieCreatedNotification && <p className="boder text-green-500"> {movieCreatedNotification}</p>}
                {movieError && <p className=" text-red-500 border h-10 text-center"> {movieError} </p>}
                <h1 className=' text-3xl mb-4'> Create Movie </h1>


                <label htmlFor="title">  Title <br />
                    <input 
                    type="text" 
                    name='title'
                    placeholder='title' 
                    value={movie.title}
                    onChange={handleChange}
                    className='rounded w-96 border mb-6 h-8 '/>
                </label> <br />


                <label htmlFor="description"> Description<br />
                    <input
                     type="text" 
                     placeholder='description' 
                     name="description"
                     value={movie.description}
                     onChange={handleChange}
                     className='rounded w-96 border mb-6 h-8' />
                </label> <br />


                <label htmlFor="runtime">Minutes <br />
                    <input type="text" 
                    placeholder='runtime' 
                    name="runtimeMins" 
                    onChange={handleChange}
                    className=' w-96 border' />
                </label>

                <label htmlFor="button">  <br />
                    <input type="submit" value='submit' className="w-96 hover:bg-blue-500 rounded mt-10 h-10 border bg-blue-700"/>
                </label>
            </form>
        </div>

    )
}


export default MoviePage;