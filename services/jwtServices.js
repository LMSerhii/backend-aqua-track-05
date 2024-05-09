import jwt from "jsonwebtoken";
import { JWT_REFRESH_SECRET, JWT_SECRET_TEMP } from "../index.js";

export const generateTokens = (payload) => {
  const token = jwt.sign(payload, JWT_SECRET_TEMP, { expiresIn: "15m" });
  const refreshToken = jwt.sign(payload, JWT_REFRESH_SECRET, {
    expiresIn: "7d",
  });
  return { token, refreshToken };
};

export const verifyToken = (refreshToken) =>
  jwt.verify(refreshToken, JWT_SECRET_TEMP);

export const verifyRefreshToken = (refreshToken) =>
  jwt.verify(refreshToken, JWT_REFRESH_SECRET);
