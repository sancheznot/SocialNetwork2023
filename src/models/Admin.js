import { Schema, model, models } from "mongoose";

const AdminSchema = new Schema({
   admins: {
      type: Array,
      required: true
   }
})

export default models.Admin || model("Admin", AdminSchema);