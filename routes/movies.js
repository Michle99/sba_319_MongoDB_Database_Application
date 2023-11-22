import express from 'express';
import * as moviesController from '../controllers/moviesController.js';
import '../loadEnv.js'

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


/**
 * @openapi
 * /movies/{id}:
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


/**
 * @openapi
 * /movies:
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
                    { rel: 'self', href: `${baseURL}/movies/${deletedMovie._id}` },
                    { rel: 'create', href: `${baseURL}/movies` },
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