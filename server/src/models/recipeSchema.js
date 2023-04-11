import { Schema, model } from "mongoose";

const recipeSchema = new Schema({
  name: { type: String, required: true },
  ingredients: [{ type: String, required: true }],
  instructions: { type: String, required: true },
  imageUrl: { type: String, required: true },
  cookingTime: { type: Number, required: true },
  userOwner: {
    type: Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  createdBy: { type: String, required: true },
  createdAt: { type: Date, required: true },
  updatedAt: { type: Date },
});

export const recipeModel = model("recipes", recipeSchema);
