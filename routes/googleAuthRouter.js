import { Router } from "express";
import { googleAuth, googleRedirect } from "../controllers/userControllers.js";

const googleAuthRouter = Router();

googleAuthRouter.get("/google", googleAuth);

googleAuthRouter.get("/google-redirect", googleRedirect);

export default googleAuthRouter;
