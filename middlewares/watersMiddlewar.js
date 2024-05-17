import { addWaterSchema } from "../schemas/watersSchemas.js";
import { listWaters, updateEntry } from "../services/waterServices.js";
import HttpError from "../utils/HttpError.js";
import { catchAsync } from "../utils/catchAsync.js";

export const validateWaterData = (req, res, next) => {
  const { error } = addWaterSchema.validate(req.body);

  if (error) {
    return res
      .status(400)
      .json({ success: false, error: error.details[0].message });
  }
  next();
};

export const updateArrayMiddleware = catchAsync(async (req, res, next) => {
  const { _id: owner } = req.user;
  const { date } = req.query;
  const { amount: newAmount, id: amountId } = req.body;

  const allWaterArray = await listWaters({ owner, date });

  const foundedEntryId = allWaterArray[0]?._id || null;

  if (!foundedEntryId) return next(HttpError(404));

  req.query = { foundedEntryId, amountId, newAmount };
  next();
});
