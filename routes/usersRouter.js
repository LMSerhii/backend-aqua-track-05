import express from "express";
import {
  current,
  login,
  logout,
  signup,
  updateAvatarController,
} from "../controllers/userControllers.js";
import validateBody from "../utils/validateBody.js";
import { loginUserSchema, sigupUserSchema } from "../schemas/usersSchemas.js";
import {
  loginUserMiddleware,
  logoutUserMiddleware,
  signUpUserMiddleware,
  updateAvatarMiddleware,
} from "../middlewares/usersMiddlewares.js";
import { auth } from "../middlewares/authMiddlewares.js";
import { upload } from "../middlewares/uploadMiddleware.js";

const authRouter = express.Router();

authRouter.post(
  "/signup",
  validateBody(sigupUserSchema),
  signUpUserMiddleware,
  signup
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

export default authRouter;
