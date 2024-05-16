import express from "express";

import {
  addWaterAmount,
  countAllWaterRecordsByDate,
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

waterRouter.post("/daily_count", auth, countAllWaterRecordsByDate);

waterRouter.put("/edit", auth, updateArrayMiddleware, updateWaterAmount);

waterRouter.put("/delete", auth, updateArrayMiddleware, removeWaterAmount);

waterRouter.post("/month", auth, getWaterRecordsByCurrentUserAndMonth);

export default waterRouter;
