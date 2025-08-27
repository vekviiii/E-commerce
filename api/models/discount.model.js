import mongoose from "mongoose";

const discountSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
  percentage: { type: Number, required: true },
  validTill: { type: Date, required: true },
});

export default mongoose.model("Discount", discountSchema);