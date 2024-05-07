import Joi from "joi";

export const createContactSchema = Joi.object({
  name: Joi.string().required(),
  phone: Joi.string().required(),
  favorite: Joi.boolean(),
}).options({ abortEarly: false });

export const updateContactSchema = Joi.object({
  name: Joi.string(),
  phone: Joi.string(),
  favorite: Joi.boolean(),
}).options({ abortEarly: false });

export const updateFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required(),
});
