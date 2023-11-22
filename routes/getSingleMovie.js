import express from 'express';
import * as moviesController from '../controllers/moviesController.js';
import '../loadEnv.js';

const router = express.Router();
const baseURL = process.env.BASE_URL;


/**
 * @openapi
 * /api/movies/{id}:
 *  get:
 *    summary: Get a movie by ID
 *    tags: [Movie]
 *    description: Retrieve a movie by its ID.
 *    parameters:
 *      - name: id
 *        in: path
 *        description: Movie ID
 *        required: true
 *        schema:
 *          type: string
 *        example: '123'
 *    responses:
 *      '200':
 *        description: Successful response
 *        content:
 *          application/json:
 *            example: { movie: {movie1: {}}, message: 'Movie retrieved successfully' }
 *      '404':
 *        description: Movie not found
 *        content:
 *          application/json:
 *            example: { error: 'Movie not found' }
 */
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
                { rel: 'self', href: `${baseURL}/api/movies/${movie._id}` },
                { rel: 'get', href: `${baseURL}/api/movies` },
                { rel: 'update', href: `${baseURL}/api/movies/${movie._id}` },
                { rel: 'delete', href: `${baseURL}/api/movies/${movie._id}` },
            ],
        };

        res.json({ movie: movieWithLinks, message: "Movie successfully Retrieved!" });
    } catch (error) {
        console.error('Error while getting movie by ID:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

export default router;