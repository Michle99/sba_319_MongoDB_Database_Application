import express from 'express';
import allMoviesRouters from '../routes/index.js';
import rootRouter from '../routes/rootRouter.js';
import errorHandler from '../middlewares/errorMiddleware.js';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express'
import { swaggerOptionsConfig } from '../swagger/swaggerDocs.js';
import path from 'path';
import yaml from 'yamljs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const createExpressApp = () => {
    const app = express();
    const swaggerAPIModel = yaml.load(path.join(__dirname, '../swagger/swaggerAPIModel.yaml'));
    // console.log("swaggerAPIModel ", swaggerAPIModel.components.schemas)

    swaggerOptionsConfig.definition.components.schemas = {
        ...swaggerOptionsConfig.definition.components.schemas,
        ...swaggerAPIModel.components.schemas,
    };
    const swaggerSpecs = swaggerJSDoc(swaggerOptionsConfig);
    // console.log('Swagger Options Config:', swaggerSpecs);
    app.use(express.json());

    app.use(
        '/api-docs', 
        swaggerUi.serve,
        swaggerUi.setup(swaggerSpecs, { explorer: true })
    );

    app.use('/api', allMoviesRouters);
    app.use('/', rootRouter);

    app.use(errorHandler);
    
    return app;
};

export default createExpressApp;