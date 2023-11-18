const errorHandler = (err, req, res, next) => {
    console.error("Error:", err);
  
    const statusCode = err.statusCode || 500;
  
    res.status(statusCode).send({
      error: {
        message: "Uh oh! An unexpected error occurred.",
        details: err.message,
      },
    });
};

export default errorHandler;