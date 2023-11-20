import './loadEnv.js'
import startServer from './server/startServer.js';
import createExpressApp from './server/createExpressApp.js';

const port = process.env.PORT || 4000;

const app = createExpressApp();

startServer(app, port);

export default app;