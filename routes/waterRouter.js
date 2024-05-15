import express from "express";

import {
  addWaterAmount,
  countAllWaterRecordsByDate,
  getWaterRecordsByCurrentUserAndMonth,
  removeWaterAmount,
  updateWaterAmount,
} from "../controllers/waterControllers.js";
import { auth } from "../middlewares/authMiddlewares.js";

const waterRouter = express.Router();

waterRouter.post("/add", auth, addWaterAmount);
waterRouter.post("/daily_count", countAllWaterRecordsByDate);
waterRouter.put("/edit/:id", auth, updateWaterAmount);
waterRouter.patch("/delete/:id", auth, removeWaterAmount);
waterRouter.post("/month", auth, getWaterRecordsByCurrentUserAndMonth);

export default waterRouter;
