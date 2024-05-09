import express from "express";

import {
  addWaterAmountController,
  getAllWaterRecordsByDate,
} from "../controllers/waterControllers.js";
import { auth } from "../middlewares/authMiddlewares.js";

const waterRouter = express.Router();

waterRouter.post("/add", auth, addWaterAmountController);
waterRouter.get("/:id", auth, getAllWaterRecordsByDate);

export default waterRouter;
