const errorHandler = (err, req, res, next) => {
  console.error(`er: ${err.message}`);

  const statusCode = res.statusCode !== 200 ? res.statusCode : 500;

  res.status(statusCode).json({ error: `${err.message}` });
};

export default errorHandler;