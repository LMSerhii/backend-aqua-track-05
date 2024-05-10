import { refreshTokenService } from "../services/usersServices.js";

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
  const { name, email } = req.user;

  res.json({ name, email });
};

export const verifyByEmailController = (req, res) => {
  res.json({ message: "Verification successful" });
};

export const resendVerifyController = (req, res) => {
  res.json({ message: "Verification email sent" });
};

export const updateAvatarController = (req, res) => {
  const { avatar } = req.user;

  res.json({ avatar });
};
