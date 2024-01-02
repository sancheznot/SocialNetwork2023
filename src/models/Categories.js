import { Schema, model, models } from "mongoose";

const CategoriesSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
    imgURL: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default models.Categorie || model("Categorie", CategoriesSchema);
