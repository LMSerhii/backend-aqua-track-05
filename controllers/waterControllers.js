import {
  addWaterAmountService,
  countTotalAmountByDateService,
  deleteEntry,
  deleteWaterAmountService,
  getTrackList,
  getWaterRecordsByUserAndMonth,
  updateEntry,
} from "../services/waterServices.js";
import { catchAsync } from "../utils/catchAsync.js";

// * Додавання запису про спожиту воду *
export const addWaterAmount = catchAsync(async (req, res) => {
  const result = await addWaterAmountService(req.user._id, req.body);

  return res.status(201).json(result);
});

// * Підрахунок всіх записів про спожиту воду за день *
export const countAllWaterRecordsByDate = catchAsync(async (req, res) => {
  const { id: ownerId } = req.user;
  const { date } = req.body;

  const result = await countTotalAmountByDateService(ownerId, date);

  return res.status(200).json({ success: true, ...result });
});

// * Оновлення запису спожитої води *
export const updateWaterAmount = catchAsync(async (req, res) => {
  const { foundedEntryId, amountId, newAmount } = req.query;

  const updatedEntry = await updateEntry(foundedEntryId, amountId, newAmount);

  res.json({ data: updatedEntry });
});

// * Видалення запису спожитої води *
export const removeWaterAmount = catchAsync(async (req, res) => {
  const { foundedEntryId, amountId } = req.query;

  const deletedEntry = await deleteEntry(foundedEntryId, amountId);
  res.json({ data: deletedEntry });
});

// * Отримання всіх записів користувача за місяць *
export const getWaterRecordsByCurrentUserAndMonth = catchAsync(
  async (req, res) => {
    const { _id: userId } = req.user;
    const { month } = req.query;

    const waterRecords = await getWaterRecordsByUserAndMonth(userId, month);

    let totalAmount = 0;
    waterRecords.forEach((record) => {
      record.amounts.forEach((amountRecord) => {
        totalAmount += amountRecord.amount;
      });
    });

    res.status(200).json({ success: true, data: waterRecords, totalAmount });
  }
);

// * Отримання всіх записів користувача за день *
export const dailyTrack = catchAsync(async (req, res) => {
  const { id: owner } = req.user;
  const { date } = req.query;

  const result = await getTrackList(owner, date);

  if (!result[0]) return res.json([]);

  return res.json([...result[0].amounts]);
});
