import express from 'express';
import getAllMoviesRouter from './getAllMovies.js';

const router = express.Router();

router.use('/movies', getAllMoviesRouter);




export default router;
