import mongoose from "mongoose";

const inventoryLogSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
  changeType: { type: String, enum: ["PURCHASE", "RESTOCK"], required: true },
  quantityChanged: { type: Number, required: true },
  newStock: { type: Number, required: true },
  note: { type: String }
}, { timestamps: true });

export default mongoose.model("InventoryLog", inventoryLogSchema);