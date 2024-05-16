import Joi from "joi";

export const addWaterSchema = Joi.object({
  date: Joi.string().regex(/^\d{2}-\d{2}-\d{4}$/),
  amount: Joi.number().min(0),
  time: Joi.string()
    .regex(/^\d{2}:\d{2}$/)
    .required(),
});
