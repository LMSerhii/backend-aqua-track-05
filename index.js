import dotenv from "dotenv";

dotenv.config();

export const {
  PORT,
  MONGODB_URL,
  JWT_SECRET_TEMP,
  JWT_EXPIRES_IN_TEMP,
  JWT_REFRESH_SECRET,
  JWT_REFRESH_EXPIRES_IN,
  BASE_URL,
  MAIL_NAME,
  MAIL_PSW,
  FRONTEND_URL,
} = process.env;
