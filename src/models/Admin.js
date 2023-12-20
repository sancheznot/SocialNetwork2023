import { Schema, model, models } from "mongoose";

const AdminSchema = new Schema({
   adminList: {
      type: Array,
      required: true,
   },
})

export default models.Admin || model("Admin", AdminSchema);