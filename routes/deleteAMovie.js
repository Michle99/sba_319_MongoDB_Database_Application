import express from 'express';
import * as moviesController from '../controllers/moviesController.js';
import '../loadEnv.js'

const router = express.Router();
const baseURL = process.env.BASE_URL;

             
/**
 * @swagger
 * /movies/{id}:
 *  delete:
 *    summary: Delete a movie by ID
 *    tags: [Movie]
 *    description: Delete a movie by its ID.
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
 *        description: Movie deleted successfully
 *        content:
 *          application/json:
 *            example: { movie: deletedMovie, message: 'Movie deleted successfully' }
 *      '404':
 *        description: Movie not found
 *        content:
 *          application/json:
 *            example: { error: 'Movie not found' }
 *      '500':
 *        description: Internal Server Error
 *        content:
 *          application/json:
 *            example: { error: 'Internal Server Error' }
 */
router.delete('/:id', async (req, res) => {
    try {
        const movieId = req.params.id;
        if (!movieId) {
            return res.status(400).json({ error: 'Invalid movie ID' });
        }
        const deletedMovie = await moviesController.deleteMovie(movieId);
        console.log("-----------Result of Deleted Movie: 'deletedMovie' data in the DELETE router-------:\n", 
            deletedMovie
        );
        if (deletedMovie) {
            const deletedMovieWithLinks = {
                ...deletedMovie,
                links: [
                    { rel: 'self', href: `${baseURL}/api/movies/${deletedMovie._id}` },
                    { rel: 'post', href: `${baseURL}/api/movies` },
                    { rel: 'get', href: `${baseURL}/api/movies` },
                    { rel: 'getById', href: `${baseURL}/api/movies/${deletedMovie._id}` },
                    { rel: 'update', href: `${baseURL}/api/movies/${deletedMovie._id}` },
                ],
            };
            res.json({ movie: deletedMovieWithLinks, message: 'Movie successfully deleted!' });
        } else {
            res.status(404).json({ error: 'Movie not found' });
        }
    } catch (error) {
        console.error('Error while deleting movie:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


export default router;