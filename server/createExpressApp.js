import express from 'express';
import moviesRouter from '../routes/movies.js';
import errorHandler from '../middlewares/errorMiddleware.js';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express'
import { swaggerOptionsConfig } from '../swagger/swaggerDocs.js';


const createExpressApp = () => {
    const app = express();
    const swaggerSpecs = swaggerJSDoc(swaggerOptionsConfig);

    app.use(express.json());

    app.use(
        '/api-docs', 
        swaggerUi.serve,
        swaggerUi.setup(swaggerSpecs)
    );

    app.use('/movies', moviesRouter);

    app.use(errorHandler);
    
    return app;
};

export default createExpressApp;