import mongoose from "mongoose";

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

export const countTotalAmountByDateService = async (ownerId, date) => {
  try {
    const query = { owner: ownerId };

    if (date) {
      query.date = date;
    }

    const waterRecords = await Water.find(query);

    const amounts = waterRecords.map((record) => record.amounts).flat();

    const totalAmount = amounts.reduce((sum, record) => sum + record.amount, 0);

    return { date, data: amounts, totalAmount };
  } catch (error) {
    console.error(error);
    throw new Error("Server Error");
  }
};

export const updateWaterAmountByIdService = async (
  recordId,
  amountId,
  amount,
  time
) => {
  try {
    const waterRecord = await Water.findById(recordId);

    if (!waterRecord) {
      throw new Error("Record not found");
    }

    const mongooseId = mongoose.Types.ObjectId.isValid(amountId)
      ? amountId
      : mongoose.Types.ObjectId(amountId);

    const updatedAmount = waterRecord.amounts.id(mongooseId);

    if (!updatedAmount) {
      throw new Error("Amount not found");
    }

    updatedAmount.amount = amount;
    updatedAmount.time = time;

    await waterRecord.save();

    return updatedAmount;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const deleteWaterAmountService = async (recordId, amountId) => {
  try {
    const waterRecord = await Water.findById(recordId);

    if (!waterRecord) {
      return { success: false, statusCode: 404, error: "Record not found" };
    }

    const index = waterRecord.amounts.findIndex(
      (amount) => amount._id.toString() === amountId
    );
    if (index === -1) {
      return { success: false, statusCode: 404, error: "Amount not found" };
    }

    waterRecord.amounts.splice(index, 1);

    await waterRecord.save();

    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false, statusCode: 500, error: "Server Error" };
  }
};

export const getWaterRecordsByUserAndMonth = async (userId, month) => {
  try {
    let waterRecords = await Water.find({ owner: userId });

    if (month) {
      const [mm, yyyy] = month.split("-");
      const startDate = new Date(parseInt(yyyy, 10), parseInt(mm, 10) - 1, 1);
      const endDate = new Date(parseInt(yyyy, 10), parseInt(mm, 10), 0);

      waterRecords = waterRecords.filter((record) => {
        const recordDate = new Date(record.date.split("-").reverse().join("-"));

        return recordDate >= startDate && recordDate <= endDate;
      });
    }

    return waterRecords;
  } catch (error) {
    throw new Error("Server Error");
  }
};
