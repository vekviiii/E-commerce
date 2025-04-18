const errorHandler = (err, req, res, next) => {
  console.error(`error: ${err.message}`);

  const statusCode = res.statusCode !== 200 ? res.statusCode : 500;

  res.status(statusCode).json("Something went wrong");
};

export default errorHandler;