import express from "express";
import {
  current,
  login,
  logout,
  refresh,
  resendVerifyController,
  signup,
  updateAvatarController,
  updateUser,
  verifyByEmailController,
} from "../controllers/userControllers.js";
import validateBody from "../utils/validateBody.js";
import {
  emailUserSchema,
  loginUserSchema,
  refreshSchema,
  sigupUserSchema,
} from "../schemas/usersSchemas.js";
import {
  isValidId,
  loginUserMiddleware,
  logoutUserMiddleware,
  signUpUserMiddleware,
  updateAvatarMiddleware,
  validateUpdateUser,
} from "../middlewares/usersMiddlewares.js";
import {
  auth,
  resendVerifyEmailMiddleware,
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
  "/refresh",
  validateBody(refreshSchema),
  verifyRefreshTokenMiddleware,
  refresh
);

authRouter.get("/current", auth, current);

authRouter.patch(
  "/avatars",
  auth,
  upload.single("avatar"),
  updateAvatarMiddleware,
  updateAvatarController
);

authRouter.put(
  "/:id",
  isValidId,
  auth,
  validateUpdateUser,
  updateUser
);

export default authRouter;
