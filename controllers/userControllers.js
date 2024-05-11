import { FRONTEND_URL } from "../index.js";
import { refreshTokenService, upgradeUser } from "../services/usersServices.js";
import { catchAsync } from "../utils/catchAsync.js";

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

export const updateUser = catchAsync(async (req, res) => {
  const { _id: id } = req.user;

  const user = await upgradeUser(id, req.body);

  res.json(user);
});
