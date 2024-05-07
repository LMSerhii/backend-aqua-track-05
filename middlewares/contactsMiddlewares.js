import { isValidObjectId } from "mongoose";
import HttpError from "../utils/HttpError.js";
import validateBody from "../utils/validateBody.js";
import {
  createContactSchema,
  updateContactSchema,
  updateFavoriteSchema,
} from "../schemas/contactsSchemas.js";

export const handleContactNotFound = (req, res, next) => {
  const { status, message } = HttpError(404);
  return res.status(status).json({ message });
};

export const isValiId = (req, res, next) => {
  const { id } = req.params;

  if (!isValidObjectId(id)) next(HttpError(400, `${id} is not valid id`));

  next();
};

export const validateCreateContact = (req, res, next) => {
  validateBody(createContactSchema)(req, res, next);
};

export const validateUpdateContact = (req, res, next) => {
  if (Object.keys(req.body).length === 0) {
    next(HttpError(400, "Body must have at least one field"));
    return;
  }

  validateBody(updateContactSchema)(req, res, next);
};

export const validateUpdateFavorite = (req, res, next) => {
  validateBody(updateFavoriteSchema)(req, res, next);
};
