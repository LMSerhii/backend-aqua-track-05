import { getContactById } from "../services/contactsServices.js";
import { sendEmail } from "../services/emailServices.js";
import {
  findUserByEmailService,
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

  await user.createToken();
  await user.save();

  next();
});

export const sendVerifyEmail = catchAsync(async (req, res, next) => {
  const { email, verificationToken } = req.user;

  await sendEmail(email, verificationToken);
  next();
});

export const resendVerifyEmailMiddleware = catchAsync(
  async (req, res, next) => {
    const { email } = req.body;

    const user = await findUserByEmailService(email);

    if (!user) {
      throw HttpError(404, "User not found");
    }

    if (user.verify) {
      throw HttpError(400, "Verification has already been passed");
    }

    req.user = user;
    next();
  }
);

export const verifyOwner = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const { _id: owner } = req.user;

  const contact = await getContactById(id);

  if (!contact) return next(HttpError(404, "Contact not found"));

  const isEqual = contact.owner.toString() === owner.toString();

  if (!isEqual) return next(HttpError(404));

  req.contact = contact;

  next();
});
