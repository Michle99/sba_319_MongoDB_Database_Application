import express from 'express';
import getAllMoviesRouter from './getAllMovies.js';
import getSingleMovieRouter from './getSingleMovie.js'
import postAMovieRouter from './postAMovie.js';
import putAMovieRouter from './putAMovie.js';
import deleteAMovieRouter from './deleteAMovie.js';

const router = express.Router();

router.use('/movies', getAllMoviesRouter);
router.use('/movies', getSingleMovieRouter);
router.use('/movies', postAMovieRouter);
router.use('/movies', putAMovieRouter);
router.use('/movies', deleteAMovieRouter);

export default router;
