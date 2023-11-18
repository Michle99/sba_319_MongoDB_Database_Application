// custom function to start server
const startServer = (app, port) => {
    app.listen(port, () => {
      console.log(`Server is running on port: http://localhost:${port}`);
    });
};

export default startServer;