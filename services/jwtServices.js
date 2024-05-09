import jwt from "jsonwebtoken";

const { JWT_SECRET_TEMP, JWT_REFRESH_SECRET } = process.env;

export const generateTokens = (payload) => {
  const token = jwt.sign(payload, JWT_SECRET_TEMP, { expiresIn: "15m" });
  const refreshToken = jwt.sign(payload, JWT_REFRESH_SECRET, {
    expiresIn: "7d",
  });
  return { token, refreshToken };
};
