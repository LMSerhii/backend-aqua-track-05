import { listWaters, updateEntry } from "../services/waterServices.js";
import HttpError from "../utils/HttpError.js";
import { catchAsync } from "../utils/catchAsync.js";

export const updateArrayMiddleware = catchAsync(async (req, res, next) => {
  const { _id: owner } = req.user;
  const { date, amount: newAmount, id: amountId } = req.body;

  const allWaterArray = await listWaters({ owner, date });

  const foundedEntryId = allWaterArray[0]?._id || null;

  if (!foundedEntryId) return next(HttpError(404));

  req.query = { foundedEntryId, amountId, newAmount };
  next();
});
