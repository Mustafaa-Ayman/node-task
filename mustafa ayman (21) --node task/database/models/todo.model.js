import mongoose from "mongoose";
const todoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  body: { type: String, required: true },
  checked: { type: Boolean, default: false },
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
});
export const Todo = mongoose.model("Todo", todoSchema);
