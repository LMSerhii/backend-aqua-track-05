import path from "path";
import crypto from "crypto";
import { isValidObjectId } from "mongoose";

import {
  createUserService,
  findUserByEmailService,
  removeTokenService,
  updatingAvatar,
} from "../services/usersServices.js";
import HttpError from "../utils/HttpError.js";
import { catchAsync } from "../utils/catchAsync.js";
import { removeImage, updateImage } from "../services/fileServices.js";
import { User } from "../models/userModel.js";

export const signUpUserMiddleware = catchAsync(async (req, res, next) => {
  const { email } = req.body;

  const user = await findUserByEmailService(email);

  if (user) throw HttpError(409, "Email already in use");

  const newUser = await createUserService(req.body);

  req.user = newUser;
  next();
});

export const loginUserMiddleware = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await findUserByEmailService(email);

  if (!user) throw HttpError(401, "Email or password is wrong");

  if (!user.verify) throw HttpError(401, "Account is not verified");

  const isCompare = await user.comparePassword(password);

  if (!isCompare) throw HttpError(401, "Email or password is wrong");

  await user.createToken();
  await user.createRefreshToken();
  await user.save();

  req.user = user;
  next();
});

export const logoutUserMiddleware = catchAsync(async (req, res, next) => {
  const { _id } = req.user;

  await removeTokenService(_id);
  next();
});

export const updateAvatarMiddleware = catchAsync(async (req, res, next) => {
  const { _id } = req.user;

  const avatarDir = path.join(process.cwd(), "public", "avatars");

  const { path: tempUpload, originalname } = req.file;

  const filename = `${_id}_${originalname}`;

  const destUpload = path.join(avatarDir, filename);

  const avatarURL = path.join("avatars", filename);

  await removeImage(tempUpload, destUpload);

  await updateImage(destUpload);

  const user = await updatingAvatar(_id, avatarURL);

  req.user = user;
  next();
});

export const validateUpdatedField = (req, res, next) => {
  if (Object.keys(req.body).length === 0) {
    next(HttpError(400, "Body must have at least one field"));
    return;
  }
  next();
};

export const resetMiddleware = async (req, res, next) => {
  const { otp } = req.params;

  const otpHash = crypto.createHash("sha256").update(otp).digest("hex");

  const user = await User.findOne({
    passwordResetToken: otpHash,
    passwordResetTokenExp: { $gt: Date.now() },
  });

  if (!user) return next(HttpError(500, "The token has expired"));

  req.user = user;

  next();
};
