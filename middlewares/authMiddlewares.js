import {
  sendEmail,
  sendForgotTokenByEmail,
} from "../services/emailServices.js";
import {
  findUserByEmailService,
  findUserByRefreshToken,
  findUserByVerificationToken,
  updateVerify,
  verifyUserToken,
} from "../services/usersServices.js";
import HttpError from "../utils/HttpError.js";
import { catchAsync } from "../utils/catchAsync.js";

export const auth = catchAsync(async (req, res, next) => {
  const { authorization = "" } = req.headers;

  const [bearer, token] = authorization.split(" ");

  if (bearer !== "Bearer") throw HttpError(401);

  const user = await verifyUserToken(token);

  if (!user || !user.token || user.token !== token) return next(HttpError(401));

  req.user = user;
  next();
});

export const verifyByEmailMiddleware = catchAsync(async (req, res, next) => {
  const { verificationToken } = req.params;

  const user = await findUserByVerificationToken(verificationToken);

  if (!user) {
    throw HttpError(404, "User not found");
  }

  await updateVerify(user._id);

  next();
});

export const sendVerifyEmail = catchAsync(async (req, res, next) => {
  const { name, email, verificationToken } = req.user;

  await sendEmail(name, email, verificationToken);
  next();
});

export const sendResettoken = catchAsync(async (req, res, next) => {
  const user = await findUserByEmailService(req.body.email);

  if (!user) {
    return res
      .status(200)
      .json({ msg: "Password reset instructions sent by email" });
  }

  const otp = await user.createPasswordResetToken();
  await user.save();

  await sendForgotTokenByEmail(req.body.email, otp);

  next();
});

export const resendVerifyEmailMiddleware = catchAsync(
  async (req, res, next) => {
    const { email } = req.body;

    const user = await findUserByEmailService(email);

    if (!user) return next(HttpError(404, "User not found"));

    if (user.verify) {
      return next(HttpError(400, "Verification has already been passed"));
    }

    req.user = user;
    next();
  }
);

export const verifyRefreshTokenMiddleware = catchAsync(
  async (req, res, next) => {
    const { refreshToken } = req.body;

    const isExist = await findUserByRefreshToken(refreshToken);

    if (!isExist) return next(HttpError(403, "Token inactive"));

    next();
  }
);
