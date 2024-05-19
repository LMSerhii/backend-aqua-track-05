import { FRONTEND_URL } from "../index.js";

export const googleAuth = (req, res) => {
  const { stringifiedParams } = req.params;

  return res.redirect(
    `https://accounts.google.com/o/oauth2/v2/auth?${stringifiedParams}`
  );
};

export const googleRedirect = (req, res, next) => {
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

  const userData = JSON.stringify({
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

  return res.redirect(
    `${FRONTEND_URL}/?&token=${token}&refreshToken=${refreshToken}&userData=${userData}`
  );
};
