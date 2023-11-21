import express from 'express';
import * as moviesController from '../controllers/moviesController.js';


const router = express.Router();

/*********************************************/
//              GET ALL MOVIES
/*********************************************/
router.get('/', moviesController.getAllMovies);


/*********************************************/
//              GET MOVIES BY ID
/*********************************************/
router.get('/:id', moviesController.getMovieById);


/*********************************************/
//              POST NEW MOVIE 
/*********************************************/
router.post('/', moviesController.createMovie);


/*********************************************/
//              UPDATE MOVIE BY ID
/*********************************************/
router.put('/:id', moviesController.updateMovie);


/*********************************************/
//              DELETE MOVIE BY ID
/*********************************************/
router.delete('/:id', moviesController.deleteMovie);


export default router;