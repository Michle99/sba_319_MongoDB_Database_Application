import express from 'express';
import getAllMoviesRouter from './getAllMovies.js';
import getSingleMovieRouter from './getSingleMovie.js'

const router = express.Router();

router.use('/movies', getAllMoviesRouter);
router.use('/movies', getSingleMovieRouter);


export default router;
