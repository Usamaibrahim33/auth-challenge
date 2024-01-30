import express from 'express';
import  {createNewMovie, deleteMovieByTitle, getAllMovies} from '../controllers/movie.js';


const router = express.Router();



router.post('/', createNewMovie)
router.get('/', getAllMovies)
router.delete('/:id', deleteMovieByTitle)
export default router;
