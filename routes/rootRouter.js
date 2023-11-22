import express from 'express';
import * as moviesController from '../controllers/moviesController.js';
import '../loadEnv.js';

const router = express.Router();
const baseURL = process.env.BASE_URL;


/**
 * @openapi
 * /movies:
 *  get:
 *    summary: Get all movies
 *    tags: [Movie]
 *    description: Retrieve a list of all movies.
 *    responses:
 *      '200':
 *        description: Successful response
 *        content:
 *          application/json:
 *            example: { movies: [{movie1: {}}, {movie2: {}}], message: 'Movies retrieved successfully' }
 */
router.get('/', async (req, res) => {
    try {
        const movies = await moviesController.getAllMovies(req, res);
        // console.log("Movies data from the routes/movies:", movies);
        if (movies) {
            const moviesWithLinks = movies.map(movie => {
                return {
                    ...movie,
                    links: [
                        { rel: 'self', href: `${baseURL}/api/movies/${movie._id}` },
                        { rel: 'update', href: `${baseURL}/api/movies/${movie._id}` },
                        { rel: 'delete', href: `${baseURL}/api/movies/${movie._id}` },
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

export default router;
