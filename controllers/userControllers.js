import queryString from "query-string";
import axios from "axios";

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
  const { name, email, token, refreshToken, avatar } = req.user;

  res.json({
    token,
    refreshToken,
    user: {
      name,
      email,
      avatar,
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
  res.redirect(`${FRONTEND_URL}/signin`);
};

export const resendVerifyController = (req, res) => {
  res.json({ message: "Verification email sent" });
};

export const updateAvatarController = (req, res) => {
  const { avatar } = req.user;

  res.json({ avatar });
};

export const googleAuth = (req, res) => {
  const stringifiedParams = queryString.stringify({
    client_id: GOOGLE_CLIENT_ID,
    redirect_uri: `${BASE_URL}/users/google-redirect`,
    scope: [].join(" "),
    response_type: "code",
    access_type: "offline",
    prompt: "consent",
  });

  return res.redirect(
    `https://accounts.google.com/o/oauth2/v2/auth?${stringifiedParams}`
  );
};

export const googleRedirect = catchAsync(async (req, res) => {
  const fullUrl = `${req.protocol}://${req.get("host")}${req.originalUrl}`;

  const urlObj = new URL(fullUrl);

  const urlParams = queryString.parse(urlObj.search);

  const { code } = urlParams;

  const tokenData = await axios({
    url: `https://oauth2.googleapis.com/token`,
    method: "post",
    data: {
      client_id: GOOGLE_CLIENT_ID,
      client_secret: GOOGLE_CLIENT_SECRET,
      redirect_uri: `${BASE_URL}/users/google-redirect`,
      grant_type: "authorization_code",
      code,
    },
  });

  const userData = await axios({
    url: "https://www.googleapis.com/oauth2/v2/userinfo",
    method: "get",
    headers: {
      Authorization: `Bearer ${tokenData.data.access_token}`,
    },
  });

  return res.redirect(`${FRONTEND_URL}?email=${userData.data.email}`);
});

export const updateUser = catchAsync(async (req, res) => {
  const { _id: id } = req.user;

  const user = await upgradeUser(id, req.body);

  res.json(user);
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
