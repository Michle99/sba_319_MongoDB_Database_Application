import express from 'express';
import * as moviesController from '../controllers/moviesController.js';
import '../loadEnv.js';

const router = express.Router();
const baseURL = process.env.BASE_URL;


/**
 * @openapi
 * /api/movies:
 *  post:
 *    summary: Create a new movie
 *    tags: [Movie]
 *    description: Create a new movie entry.
 *    requestBody:
 *      content:
 *        application/json:
 *           schema:
 *             $ref: '#/components/schemas/Movie'
 *      required: true
 *    responses:
 *      '200':
 *        description: Movie created successfully
 *        content:
 *          application/json:
 *            example: { movie: newMovie, message: 'Movie created successfully' }
 *      '400':
 *        description: Invalid request or missing data
 *        content:
 *          application/json:
 *            example: { error: 'Invalid request or missing data' }
 */
router.post('/', async (req, res) => {
    try {
        const newMovie = await moviesController.createMovie(req.body);
        // console.log("New Movie added data from the POST router:", newMovie);
        const newMovieWithLinks = {
            ...newMovie,
            links: [
                { rel: 'self', href: `${baseURL}/api/movies/${newMovie._id}` },
                { rel: 'update', href: `${baseURL}/api/movies/${newMovie._id}` },
                { rel: 'delete', href: `${baseURL}/api/movies/${newMovie._id}` },
                { rel: 'getById', href: `${baseURL}/api/movies/${newMovie._id}` },
                { rel: 'get', href: `${baseURL}/api/movies` },
            ],
        };
        res.json({ movie: newMovieWithLinks, message: 'Movie successfully added!' });
    } catch (error) {
        console.error('Error while creating a new movie:', error);
        res.status(500).json({ error: { title: 'Internal Server Error', required: true } });
    }
});

export default router;