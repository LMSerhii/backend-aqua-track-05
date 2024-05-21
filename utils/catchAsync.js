export const catchAsync = (fn) => (req, res, next) => {
  fn(req, res, next).catch((err) => {
    // eslint-disable-next-line no-param-reassign
    if (err.message === "jwt expired") err.status = 401;
    next(err);
  });
};
