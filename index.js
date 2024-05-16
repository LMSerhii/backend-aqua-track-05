import dotenv from "dotenv";

dotenv.config();

export const {
  BASE_URL,
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  PORT,
  MONGODB_URL,
  JWT_SECRET_TEMP,
  JWT_EXPIRES_IN_TEMP,
  JWT_REFRESH_SECRET,
  JWT_REFRESH_EXPIRES_IN,
  MAIL_NAME,
  MAIL_PSW,
  FRONTEND_URL,
} = process.env;
