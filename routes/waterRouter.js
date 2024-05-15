import express from "express";

import {
  addWaterAmount,
  countAllWaterRecordsByDate,
  getWaterRecordsByCurrentUserAndMonth,
  removeWaterAmount,
  updateWaterAmount,
} from "../controllers/waterControllers.js";
import { auth } from "../middlewares/authMiddlewares.js";
import { updateArrayMiddleware } from "../middlewares/watersMiddleware.js";

const waterRouter = express.Router();

waterRouter.post("/add", auth, addWaterAmount);

waterRouter.post("/daily_count", auth, countAllWaterRecordsByDate);

waterRouter.put("/edit", auth, updateArrayMiddleware, updateWaterAmount);

waterRouter.put("/delete", auth, updateArrayMiddleware, removeWaterAmount);

waterRouter.post("/month", auth, getWaterRecordsByCurrentUserAndMonth);

export default waterRouter;
