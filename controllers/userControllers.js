import { catchAsync } from "../utils/catchAsync.js";
import {
  BASE_URL,
  FRONTEND_URL,
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
} from "../index.js";
import { User } from "../models/userModel.js";
import {
  refreshTokenService,
  resetPasswordService,
  upgradeUser,
} from "../services/usersServices.js";

export const signup = (req, res) => {
  const { name, email } = req.user;

  res.status(201).json({
    user: {
      name,
      email,
    },
  });
};

export const login = (req, res) => {
  const {
    name,
    email,
    token,
    refreshToken,
    avatar,
    gender,
    weight,
    sportTime,
    dailyWater,
  } = req.user;

  res.json({
    token,
    refreshToken,
    user: {
      name,
      email,
      avatar,
      gender,
      weight,
      sportTime,
      dailyWater,
    },
  });
};

export const refresh = async (req, res) => {
  const { refreshToken } = req.body;

  const { token, refreshToken: newRefreshToken } = await refreshTokenService(
    refreshToken
  );
  res.json({ token, refreshToken: newRefreshToken });
};

export const logout = (req, res) => {
  res.sendStatus(204);
};

export const current = (req, res) => {
  const { name, email, avatar, gender, weight, sportTime, dailyWater } =
    req.user;

  res.json({ name, email, avatar, gender, weight, sportTime, dailyWater });
};

export const verifyByEmailController = (req, res) => {
  res.status(200).redirect(`${FRONTEND_URL}/notify`);
};

export const resendVerifyController = (req, res) => {
  res.status(200).json({ message: "Verification email sent" });
};

export const updateAvatarController = (req, res) => {
  const { avatar } = req.user;

  res.json({ avatar });
};

export const updateUser = catchAsync(async (req, res) => {
  const { _id: id } = req.user;

  const user = await upgradeUser(id, req.body);

  const { name, email, avatar, gender, weight, sportTime, dailyWater } =
    user;

  res.json({ name, email, avatar, gender, weight, sportTime, dailyWater });
});

export const allUsers = catchAsync(async (req, res) => {
  const usersCount = await User.countDocuments();

  res.json({ allUsers: usersCount });
});

export const forgotPassword = (req, res) => {
  res.status(200).json({ msg: "Password reset instructions sent by email" });
};

export const resetPassword = catchAsync(async (req, res) => {
  const { _id: id } = req.user;

  await resetPasswordService(req.params.otp, req.body.password, id);

  res.status(200).json({ msg: "Password has been updated" });
});

export const notify = (req, res) => {
  res.status(200);
};
