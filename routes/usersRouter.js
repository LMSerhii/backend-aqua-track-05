import express from "express";
import {
  allUsers,
  current,
  forgotPassword,
  login,
  logout,
  notify,
  refresh,
  resendVerifyController,
  resetPassword,
  signup,
  updateAvatarController,
  updateUser,
  verifyByEmailController,
} from "../controllers/userControllers.js";
import validateBody from "../utils/validateBody.js";
import {
  emailUserSchema,
  loginUserSchema,
  passwordUserSchema,
  refreshSchema,
  sigupUserSchema,
} from "../schemas/usersSchemas.js";
import {
  loginUserMiddleware,
  logoutUserMiddleware,
  resetMiddleware,
  signUpUserMiddleware,
  updateAvatarMiddleware,
  validateUpdatedField,
} from "../middlewares/usersMiddlewares.js";
import {
  auth,
  resendVerifyEmailMiddleware,
  sendResettoken,
  sendVerifyEmail,
  verifyByEmailMiddleware,
  verifyRefreshTokenMiddleware,
} from "../middlewares/authMiddlewares.js";
import { upload } from "../middlewares/uploadMiddleware.js";

const authRouter = express.Router();

authRouter.post(
  "/signup",
  validateBody(sigupUserSchema),
  signUpUserMiddleware,
  sendVerifyEmail,
  signup
);

authRouter.get(
  "/verify/:verificationToken",
  verifyByEmailMiddleware,
  verifyByEmailController
);

authRouter.post(
  "/verify",
  validateBody(emailUserSchema),
  resendVerifyEmailMiddleware,
  sendVerifyEmail,
  resendVerifyController
);

authRouter.post(
  "/signin",
  validateBody(loginUserSchema),
  loginUserMiddleware,
  login
);

authRouter.post("/logout", auth, logoutUserMiddleware, logout);

authRouter.post(
  "/forgot-password",
  validateBody(emailUserSchema),
  sendResettoken,
  forgotPassword
);

authRouter.post(
  "/reset-password/:otp",
  validateBody(passwordUserSchema),
  resetMiddleware,
  resetPassword
);

authRouter.post(
  "/refresh",
  validateBody(refreshSchema),
  verifyRefreshTokenMiddleware,
  refresh
);

authRouter.get("/current", auth, current);

authRouter.get("/all", allUsers);

authRouter.patch(
  "/avatars",
  auth,
  upload.single("avatar"),
  updateAvatarMiddleware,
  updateAvatarController
);

authRouter.put("/update", auth, validateUpdatedField, updateUser);

authRouter.get("/notify-to-verify", notify);

export default authRouter;
