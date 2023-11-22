import express from 'express';
import * as moviesController from '../controllers/moviesController.js';
import '../loadEnv.js';

const router = express.Router();
const baseURL = process.env.BASE_URL;


/**
 * @swagger
 * /movies/{id}:
 *  put:
 *    summary: Update a movie by ID
 *    tags: [Movie]
 *    description: Update an existing movie by its ID.
 *    parameters:
 *      - name: id
 *        in: path
 *        description: Movie ID
 *        required: true
 *        schema:
 *          type: string
 *        example: '123'
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *             $ref: '#/components/schemas/Movie'
 *    responses:
 *      '200':
 *        description: Movie updated successfully
 *        content:
 *          application/json:
 *            example: { movie: updatedMovie, message: 'Movie updated successfully' }
 *      '404':
 *        description: Movie not found
 *        content:
 *          application/json:
 *            example: { error: 'Movie not found' }
 *      '400':
 *        description: Invalid request or missing data
 *        content:
 *          application/json:
 *            example: { error: 'Invalid request or missing data' }
 */         
router.put('/:id', async (req, res) => {
    const updatedMovie = req.body;
    // console.log("updateMovie data in the PUT router:", updatedMovie);
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
        // console.log("Result of updated Movie: 'result' data in the PUT router:", result);

        if (result) {
            // Movie successfully updated
            const updatedMovieWithLinks = {
                ...result,
                links: [
                    { rel: 'self', href: `${baseURL}/api/movies/${result._id}` },
                    { rel: 'update', href: `${baseURL}/api/movies/${result._id}` },
                    { rel: 'delete', href: `${baseURL}/api/movies/${result._id}` },
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

export default router;