import { Schema, model } from "mongoose";

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  savedRecipes: [{ type: Schema.Types.ObjectId, ref: "recipes" }],
});

export const userModel = model("users", userSchema);
