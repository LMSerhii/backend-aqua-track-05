export const handleMongooseError = (err, data, next) => {
  const { name, code } = err;
  const status = name === "MongoServerError" && code === 11000 ? 409 : 400;
  // eslint-disable-next-line no-param-reassign
  err.status = status;

  next();
};
