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
        // console.log("Movies data from the routes/movies:", movies);
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
router.get('/:id', async (req, res) => {
    try {
        const movieId = req.params.id;
        if (!movieId) {
            return res.status(400).json({ error: 'Invalid movie ID' });
        }

        const movie = await moviesController.getMovieById(movieId);
        // console.log("Movies data from the Router GET/:id:", movie);
        if (!movie) {
            return res.status(404).json({ error: 'Movie not found' });
        }

        const movieWithLinks = {
            ...movie,
            links: [
                { rel: 'self', href: `${baseURL}/movies/${movie._id}` },
                { rel: 'update', href: `${baseURL}/movies/${movie._id}` },
                { rel: 'delete', href: `${baseURL}/movies/${movie._id}` },
            ],
        };

        res.json({ movie: movieWithLinks, message: "Movie successfully Retrieved!" });
    } catch (error) {
        console.error('Error while getting movie by ID:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


/*********************************************/
//              POST NEW MOVIE 
/*********************************************/
router.post('/', async (req, res) => {
    try {
        const newMovie = await moviesController.createMovie(req.body);
        console.log("New Movie added data from the POST router:", newMovie);
        const newMovieWithLinks = {
            ...newMovie,
            links: [
                { rel: 'self', href: `${baseURL}/movies/${newMovie._id}` },
                { rel: 'update', href: `${baseURL}/movies/${newMovie._id}` },
                { rel: 'delete', href: `${baseURL}/movies/${newMovie._id}` },
            ],
        };
        res.json({ movie: newMovieWithLinks, message: 'Movie successfully added!' });
    } catch (error) {
        console.error('Error while creating a new movie:', error);
        res.status(500).json({ error: { title: 'Internal Server Error', required: true } });
    }
});


/*********************************************/
//              UPDATE MOVIE BY ID
/*********************************************/
router.put('/:id', async (req, res) => {
    const updatedMovie = req.body;
    console.log("updateMovie data in the PUT router:", updatedMovie);
    const movieId = req.params.id;
    try {
        if (!movieId) {
            return res.status(400).json({ error: 'Invalid movie ID' });
        }
        // Check if updatedMovie is provided
        if (!updatedMovie || Object.keys(updatedMovie).length === 0) {
            
            return res.status(400).json({ error: 'No valid data provided for update.' });
        }

        const result = await moviesController.updateMovie(movieId, updatedMovie);
        console.log("Result of updated Movie: 'result' data in the PUT router:", result);

        if (result) {
            // Movie successfully updated
            const updatedMovieWithLinks = {
                ...result,
                links: [
                    { rel: 'self', href: `${baseURL}/movies/${result._id}` },
                    { rel: 'update', href: `${baseURL}/movies/${result._id}` },
                    { rel: 'delete', href: `${baseURL}/movies/${result._id}` },
                ],
            };
            res.json({ movie: updatedMovieWithLinks, message: 'Movie successfully updated!' });
        } else {
            // Movie update failed
            res.status(404).json({ error: 'Movie not found.' });
        }
    } catch (error) {
        console.error('Error while updating movie:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


/*********************************************/
//              DELETE MOVIE BY ID
/*********************************************/
router.delete('/:id', moviesController.deleteMovie);


export default router;