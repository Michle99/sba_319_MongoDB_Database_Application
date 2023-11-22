import express from 'express';
import getAllMoviesRouter from './getAllMovies.js';
import getSingleMovieRouter from './getSingleMovie.js'
import postAMovieRouter from './postAMovie.js';

const router = express.Router();

router.use('/movies', getAllMoviesRouter);
router.use('/movies', getSingleMovieRouter);
router.use('/movies', postAMovieRouter);


export default router;
