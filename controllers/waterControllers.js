import { addWaterAmountService } from "../services/waterServices.js";

import { Water } from "../models/waterModel.js";
import { User } from "../models/userModel.js";

export const addWaterAmountController = async (req, res) => {
  try {
    const result = await addWaterAmountService(req.user._id, req.body);
    return res.status(result.statusCode).json(result);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, error: "Помилка сервера" });
  }
};
//

export const getAllWaterRecordsByDate = async (req, res) => {
  const { id: ownerId } = req.params;
  const { date } = req.body;

  try {
    const query = { owner: ownerId };

    if (date) {
      query.date = date;
    }

    const waterRecords = await Water.find(query);

    const amounts = waterRecords.map((record) => record.amounts).flat();

    return res.status(200).json({ success: true, data: amounts });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, error: "Server Error" });
  }
};
