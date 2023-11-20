import express from 'express';
import moviesRouter from '../routes/movies.js';
import errorHandler from '../middlewares/errorMiddleware.js';


const createExpressApp = () => {
    const app = express();

    app.use(express.json());
    app.use('/movies', moviesRouter);

    app.use(errorHandler);
    
    return app;
};

export default createExpressApp;