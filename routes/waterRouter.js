import express from 'express';

import { addWaterAmountController } from '../controllers/waterControllers.js';
import { auth } from '../middlewares/authMiddlewares.js';

const waterRouter = express.Router();

waterRouter.post('/add', auth, addWaterAmountController);

export default waterRouter;
