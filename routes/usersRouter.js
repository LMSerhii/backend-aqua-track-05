import express from "express";
import {
  current,
  googleAuth,
  googleRedirect,
  login,
  logout,
  resendVerifyController,
  signup,
  updateAvatarController,
  verifyByEmailController,
} from "../controllers/userControllers.js";
import validateBody from "../utils/validateBody.js";
import {
  emailUserSchema,
  loginUserSchema,
  sigupUserSchema,
} from "../schemas/usersSchemas.js";
import {
  loginUserMiddleware,
  logoutUserMiddleware,
  signUpUserMiddleware,
  updateAvatarMiddleware,
} from "../middlewares/usersMiddlewares.js";
import {
  auth,
  resendVerifyEmailMiddleware,
  sendVerifyEmail,
  verifyByEmailMiddleware,
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
  "/login",
  validateBody(loginUserSchema),
  loginUserMiddleware,
  login
);

authRouter.post("/logout", auth, logoutUserMiddleware, logout);

authRouter.get("/current", auth, current);

authRouter.patch(
  "/avatars",
  auth,
  upload.single("avatar"),
  updateAvatarMiddleware,
  updateAvatarController
);

authRouter.get("/google", googleAuth);

authRouter.get("/google-redirect", googleRedirect);

export default authRouter;
