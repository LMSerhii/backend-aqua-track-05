import Joi from "joi";
import { PASSWD_REGEX } from "../constans/regex.js";

const errorPswMessage = `
Requires at least one lowercase letter (a-z) 
Requires at least one uppercase letter (A-Z)
Requires at least one digit (0-9)
Requires at least one special character among !@#_$%^&*
Requires a password length between 8 and 128 characters.`;

export const sigupUserSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string()
    .regex(PASSWD_REGEX)
    .required()
    .error(new Error(errorPswMessage)),
}).options({ abortEarly: false });

export const loginUserSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
}).options({ abortEarly: false });

export const emailUserSchema = Joi.object({
  email: Joi.string()
    .email()
    .required()
    .error(new Error("missing required field email")),
});

export const updateAvatarSchema = Joi.object({
  avatar: Joi.string()
    .required()
    .error(new Error("Avatar is a required field")),
});
