import { Water } from "../models/waterModel.js";

export const addWaterAmountService = async (ownerID, body) => {
  try {
    const { amount, time, date } = body;
    let water = await Water.findOne({ owner: ownerID, date });

    if (water) {
      water.amounts.push({ amount, time });
    } else {
      water = new Water({
        owner: ownerID,
        date,
        amounts: [{ amount, time }],
      });
    }

    await water.save();

    return { success: true, statusCode: 201, data: water };
  } catch (error) {
    console.error(error);
    return { success: false, statusCode: 500, error: "Помилка сервера" };
  }
};
