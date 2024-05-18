import express from "express";

import {
  addWaterAmount,
  countAllWaterRecordsByDate,
  dailyTrack,
  getWaterRecordsByCurrentUserAndMonth,
  removeWaterAmount,
  updateWaterAmount,
} from "../controllers/waterControllers.js";
import { auth } from "../middlewares/authMiddlewares.js";

import {
  updateArrayMiddleware,
  validateWaterData,
} from "../middlewares/watersMiddlewar.js";

const waterRouter = express.Router();

waterRouter.post("/add", auth, validateWaterData, addWaterAmount);

waterRouter.get("/daily_track", auth, dailyTrack);

waterRouter.put("/edit", auth, updateArrayMiddleware, updateWaterAmount);

waterRouter.put("/delete", auth, updateArrayMiddleware, removeWaterAmount);

waterRouter.get("/month", auth, getWaterRecordsByCurrentUserAndMonth);

export default waterRouter;
