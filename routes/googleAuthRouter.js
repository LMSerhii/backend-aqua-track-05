import { Router } from "express";
import {
  googleAuth,
  googleRedirect,
} from "../controllers/googleAuthControllers.js";
import {
  googleAuthMiddleware,
  googleRedirectMiddleware,
} from "../middlewares/googleAuthMiddleware.js";

const googleAuthRouter = Router();

googleAuthRouter.get("/google", googleAuthMiddleware, googleAuth);

googleAuthRouter.get(
  "/google-redirect",
  googleRedirectMiddleware,
  googleRedirect
);

export default googleAuthRouter;
