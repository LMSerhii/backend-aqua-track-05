import mongoose from "mongoose";

import { Water } from "../models/waterModel.js";

export const addWaterAmountService = async (ownerID, body) => {
  const { amount, time, date } = body;

  // Шукаємо запис про воду для даного користувача і дати
  const water = await Water.findOneAndUpdate(
    { owner: ownerID, date },
    // Додаємо новий запис про воду до масиву amounts або створюємо новий об'єкт води, якщо запис не існує
    { $push: { amounts: { amount, time } } },
    { new: true, upsert: true } // Якщо запис не знайдено, створюємо новий
  );

  return { success: true, statusCode: 201, data: water };
};

export const countTotalAmountByDateService = async (ownerId, date) => {
  const query = { owner: ownerId };

  if (date) {
    query.date = date;
  }

  const waterRecords = await Water.find(query);

  const amounts = waterRecords.map((record) => record.amounts).flat();

  const totalAmount = amounts.reduce((sum, record) => sum + record.amount, 0);

  return { date, data: amounts, totalAmount };
};

// export const updateWaterAmountByIdService = async (
//   recordId,
//   amountId,
//   amount,
//   time
// ) => {
//   const waterRecord = await Water.findById(recordId);

//   if (!waterRecord) {
//     throw new Error("Record not found");
//   }

//   const mongooseId = mongoose.Types.ObjectId.isValid(amountId)
//     ? amountId
//     : mongoose.Types.ObjectId(amountId);

//   const updatedAmount = waterRecord.amounts.id(mongooseId);

//   if (!updatedAmount) {
//     throw new Error("Amount not found");
//   }

//   updatedAmount.amount = amount;
//   updatedAmount.time = time;

//   await waterRecord.save();

//   return updatedAmount;
// };

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

export const listWaters = (body) => Water.find(body);

export const updateEntry = (foundedEntryId, amountId, newAmount) =>
  Water.findOneAndUpdate(
    { _id: foundedEntryId, "amounts._id": amountId },
    { $set: { "amounts.$.amount": newAmount } },
    { new: true }
  );

export const deleteEntry = (foundedEntryId, amountId) =>
  Water.findByIdAndUpdate(
    foundedEntryId,
    {
      $pull: { amounts: { _id: amountId } },
    },
    { new: true }
  );

export const getTrackList = (owner, date) => Water.find({ owner, date });
