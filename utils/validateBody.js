import HttpError from "./HttpError.js";

const validateBody = (schema) => (req, _, next) => {
  const { error } = schema.validate(req.body);
  if (error) {
    next(HttpError(400, error.message));
  }
  next();
};

export default validateBody;
