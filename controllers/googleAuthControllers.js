import { FRONTEND_URL } from "../index.js";

export const googleAuth = (req, res) => {
  const { stringifiedParams } = req.params;

  return res.redirect(
    `https://accounts.google.com/o/oauth2/v2/auth?${stringifiedParams}`
  );
};

export const googleRedirect = (req, res, next) => {
  const { name, email, token, refreshToken, avatar } = req.user;

  //   return res.redirect(
  //     `${FRONTEND_URL}/signin/?token=${token}refreshToken=${refreshToken}`
  //   );

  return res.redirect(
    `${FRONTEND_URL}/tracker/?token=${token}refreshToken=${refreshToken}`
  );

  //   res.json({
  //     token,
  //     refreshToken,
  //     user: {
  //       name,
  //       email,
  //       avatar,
  //     },
  //   });
};
