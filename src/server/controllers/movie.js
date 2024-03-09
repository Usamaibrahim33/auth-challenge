import {createNewMovieDb, deleteMovieByIdDb, getAllMoviesDb} from "../domain/movie.js";
import jwt from 'jsonwebtoken';
const secretKey = process.env.JWT_SECRET;



const createNewMovie = async (req, res) => {
    const { title, description, runtimeMins } = req.body;

    const convertedRuntimeMins = Number(runtimeMins);
    const token = req.headers.authorization;

    console.log(token);
    console.log(secretKey);
    try {
        console.log('seceret', secretKey);
        if (!token) {
            return res.status(401).json({ "error" : "no token found" });
            // throw new Error('Unauthorized: No token provided');
        }
        const tokenWithoutPrefix = token.startsWith('Bearer ') ? token.slice(7) : token;

        console.log(tokenWithoutPrefix);
        const user = await jwt.verify(tokenWithoutPrefix, secretKey);


        if (!user) {
            return res.status(401).json({ "error": "Invalid token" });
        }

        const newMovie = await createNewMovieDb(title, description, convertedRuntimeMins, user.username);
        return res.status(201).json({ movie: newMovie})

    } catch (error) {
        if(error.name === 'JsonWebTokenError') {
            console.log('Caught JsonWebTokenError:', error.message);
            return res.status(401).json({ "errorNoToken": "Invalid token format" });
        } else {
            console.log('this is the error', error);
        }
    }
};



const getAllMovies = async (req, res) => {
    const token = req.headers.authorization;
    console.log(token);
    try {
        if (!token) {
            return res.status(401).json({ "error" : "no token found" });
        }

        const tokenWithoutPrefix = token.startsWith('Bearer ') ? token.slice(7) : token;
        const user = await jwt.verify(tokenWithoutPrefix, secretKey);
        console.log(user);

        if (!user) {
            return res.status(401).json({ "error": "Invalid token" });
        }
        console.log(user);

        const allMovies = await getAllMoviesDb(user.username);
        console.log(allMovies);
        return res.status(200).json({ movies: allMovies});

    } catch (error) {
        console.log('this is the error at the start of the catch thou ');
        if(error.name === 'JsonWebTokenError') {
            console.log('Caught JsonWebTokenError:', error.message);
            return res.status(401).json({ "errorJason": "Invalid token format" });
        } else {
            console.log('this is the error', error)
        }
    }
};


const deleteMovieByTitle = async (req, res) => {
    const token = req.headers.authorization;
    const id = Number(req.params.id)
    console.log(token)
    try {
        if (!token) {
            console.log('checking nif they is token')
            return res.status(401).json({ "error" : "no token found" });
        }

        const tokenWithoutPrefix = token.startsWith('Bearer ') ? token.slice(7) : token;
        const user = await jwt.verify(tokenWithoutPrefix, secretKey);
        console.log(user)

        if (!user) {
            console.log('checking if a user exist')
            return res.status(401).json({ "error": "Invalid token" });
        }
    
        const deletedMovie = await deleteMovieByIdDb(id, user.username)
        console.log(deletedMovie)
        return res.status(200).json({deletedMovie: deletedMovie})

    } catch (error) {
        console.log(error)
    }
}


export  {createNewMovie, getAllMovies, deleteMovieByTitle};