import express from 'express';

const app = express();

const startServer = (port) => {
    app.listen(port, () => {
      console.log(`Server is running on port: http://localhost:${port}`);
    });
};

export default startServer;