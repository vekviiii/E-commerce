import mongoose from "mongoose";

const taxSchema = new mongoose.Schema({
  country: { type: String, required: true },
  percentage: { type: Number, required: true },
});

export default mongoose.model("Tax", taxSchema);