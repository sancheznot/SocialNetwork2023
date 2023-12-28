import { Schema, model, models } from "mongoose";

const CategoriesSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    products: [{
        type: Schema.Types.ObjectId,
        ref: "Products"
    }]
}, {
    timestamps: true
})

export default models.Categories || model("Categories", CategoriesSchema);