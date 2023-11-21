import express from 'express';
import * as moviesController from '../controllers/moviesController.js';
import '../loadEnv.js'

const router = express.Router();
const baseURL = process.env.BASE_URL;

/*********************************************/
//              GET ALL MOVIES
/*********************************************/
router.get('/', async (req, res) => {
    try {
        const movies = await moviesController.getAllMovies(req, res);
        console.log("Movies data from the routes/movies:", movies);
        if (movies) {
            const moviesWithLinks = movies.map(movie => {
                return {
                    ...movie,
                    links: [
                        { rel: 'self', href: `${baseURL}/movies/${movie._id}` },
                        { rel: 'update', href: `${baseURL}/movies/${movie._id}` },
                        { rel: 'delete', href: `${baseURL}/movies/${movie._id}` },
                    ],
                };
            });
            res.json({ movies: moviesWithLinks });
        } else {
            res.status(404).json({ error: 'Movies not found' });
        }
    } catch (error) {
        console.error('Error while getting all movies:', error);
        res.status(500).send({ error: 'Internal Server Error' });
    }
});


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