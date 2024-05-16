import { model, Schema } from "mongoose";
import { handleMongooseError } from "../utils/handleMangooseError.js";

const waterSchema = new Schema(
  {
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    amounts: [
      {
        amount: {
          type: Number,
          required: true,
        },

        time: {
          type: String,
          required: true,
        },
      },
    ],
  },
  {
    versionKey: false,
  }
);

waterSchema.post("save", handleMongooseError);

export const Water = model("water", waterSchema);
