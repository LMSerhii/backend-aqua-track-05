import dotenv from "dotenv";

dotenv.config();

export const {
  BASE_URL,
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  FRONTEND_URL,
} = process.env;
