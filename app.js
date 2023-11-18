import express from 'express';
import './loadEnv.js'
import moviesRouter from './routes/movies.js';
import errorHandler from './middlewares/errorMiddleware.js';
import startServer from './server/startServer.js';

const PORT = process.env.PORT || 4000;
const app = express();

app.use(express.json());
app.use('/movies', moviesRouter);

app.use(errorHandler);

startServer(PORT);