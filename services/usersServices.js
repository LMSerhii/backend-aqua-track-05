import jwt from "jsonwebtoken";
import { User } from "../models/userModel.js";

const { JWT_SECRET } = process.env;

export const createUserService = async (userData) => {
  const newUser = await User(userData);

  await newUser.hashPassword();
  await newUser.createAvatar();
  await newUser.createTempToken();
  await newUser.createVerificationToken();
  await newUser.save();

  return newUser;
};

export const findUserByVerificationToken = (verificationToken) =>
  User.findOne({ verificationToken });

export const updateVerify = (id) =>
  User.findByIdAndUpdate(id, { verify: true, verificationToken: null });

export const findUserByEmailService = (email) => User.findOne({ email });

export const findUserByID = (id) => User.findById(id);

export const removeTokenService = (id) =>
  User.findByIdAndUpdate(id, { token: "" });

export const verifyUserToken = async (token) => {
  const { id } = jwt.verify(token, JWT_SECRET);

  const user = await findUserByID(id);

  return user;
};

export const updatingAvatar = (id, avatar) =>
  User.findByIdAndUpdate(id, { avatar }, { new: true });
