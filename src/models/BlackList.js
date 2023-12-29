import { Schema, model, models } from "mongoose";

const BlackListSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    reason: {
      type: String,
      required: true,
    },
    IP: {
      type: String,
      required: false,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

export default models.BlackList || model("BlackList", BlackListSchema);
