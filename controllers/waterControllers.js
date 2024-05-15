import {
  addWaterAmountService,
  countTotalAmountByDateService,
  deleteEntry,
  deleteWaterAmountService,
  getWaterRecordsByUserAndMonth,
  updateEntry,
  updateWaterAmountByIdService,
} from "../services/waterServices.js";
import { catchAsync } from "../utils/catchAsync.js";

// * Додавання запису про спожиту воду *
export const addWaterAmount = async (req, res) => {
  try {
    const result = await addWaterAmountService(req.user._id, req.body);
    return res.status(result.statusCode).json(result);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, error: "Помилка сервера" });
  }
};

// * Підрахунок всіх записів про спожиту воду за день *
export const countAllWaterRecordsByDate = async (req, res) => {
  const { id: ownerId } = req.user;
  const { date } = req.body;

  try {
    const result = await countTotalAmountByDateService(ownerId, date);
    return res.status(200).json({ success: true, ...result });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, error: error.message });
  }
};

// * Оновлення запису спожитої води *
// export const updateWaterAmount = async (req, res) => {
//   const { id: recordId } = req.params;
//   const { amountId, amount, time } = req.body;

//   try {
//     const updatedAmount = await updateWaterAmountByIdService(
//       recordId,
//       amountId,
//       amount,
//       time
//     );
//     return res.status(200).json({ success: true, data: updatedAmount });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ success: false, error: error.message });
//   }
// };

export const updateWaterAmount = catchAsync(async (req, res) => {
  const { foundedEntryId, amountId, newAmount } = req.query;

  const updatedEntry = await updateEntry(foundedEntryId, amountId, newAmount);

  res.json({ data: updatedEntry });
});

export const removeWaterAmount = catchAsync(async (req, res) => {
  const { foundedEntryId, amountId } = req.query;

  const deletedEntry = await deleteEntry(foundedEntryId, amountId);

  res.json({ data: deletedEntry });
});

// * Видалення запису спожитої води *
// export const removeWaterAmount = async (req, res) => {
//   const { id: recordId } = req.params;
//   const { _id: amountId } = req.body;

//   try {
//     const result = await deleteWaterAmountService(recordId, amountId);
//     if (result.success) {
//       return res
//         .status(200)
//         .json({ success: true, message: "Amount deleted successfully" });
//     }
//     return res
//       .status(result.statusCode || 500)
//       .json({ success: false, error: result.error || "Server Error" });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ success: false, error: "Server Error" });
//   }
// };

// * Отримання всіх записів користувача за місяць *
export const getWaterRecordsByCurrentUserAndMonth = async (
  { user, body },
  res
) => {
  try {
    const { _id: userId } = user;
    const { month } = body;

    const waterRecords = await getWaterRecordsByUserAndMonth(userId, month);

    let totalAmount = 0;
    waterRecords.forEach((record) => {
      record.amounts.forEach((amountRecord) => {
        totalAmount += amountRecord.amount;
      });
    });

    return res
      .status(200)
      .json({ success: true, data: waterRecords, totalAmount });
  } catch (error) {
    return res.status(500).json({ success: false, error: "Server Error" });
  }
};
