import {
  generateTokens,
  verifyRefreshToken,
  verifyToken,
} from "./jwtServices.js";
import { User } from "../models/userModel.js";

export const createUserService = async (userData) => {
  const newUser = await User(userData);

  await newUser.hashPassword();
  await newUser.createAvatar();
  await newUser.createVerificationToken();
  await newUser.save();

  return newUser;
};

export const findUserByVerificationToken = (verificationToken) =>
  User.findOne({ verificationToken });

export const findUserByRefreshToken = (refreshToken) =>
  User.findOne({ refreshToken });

export const updateVerify = (id) =>
  User.findByIdAndUpdate(id, { verify: true, verificationToken: null });

export const findUserByEmailService = (email) => User.findOne({ email });

export const findUserByID = (id) => User.findById(id);

export const removeTokenService = (id) =>
  User.findByIdAndUpdate(id, { token: "", refreshToken: "" });

export const verifyUserToken = async (token) => {
  const { id } = verifyToken(token);

  const user = await findUserByID(id);

  return user;
};

export const updatingAvatar = (id, avatar) =>
  User.findByIdAndUpdate(id, { avatar }, { new: true });

export const refreshTokenService = async (refreshToken) => {
  const { id } = verifyRefreshToken(refreshToken);

  const newTokens = generateTokens({ id });

  const updatedUser = await User.findByIdAndUpdate(
    id,
    { token: newTokens.token, refreshToken: newTokens.refreshToken },
    { new: true }
  );

  return updatedUser;
};
