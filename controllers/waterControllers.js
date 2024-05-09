import { addWaterAmountService } from "../services/waterServices.js";

export const addWaterAmountController = async (req, res) => {
  try {
    const result = await addWaterAmountService(req.user._id, req.body);
    return res.status(result.statusCode).json(result);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, error: "Помилка сервера" });
  }
};
