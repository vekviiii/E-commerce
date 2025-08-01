import mongoose from "mongoose";

const CartItemSchema = new mongoose.Schema(
  {
    product: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
    quantity: { type: Number, required: true, min: 1 },
    // Snapshots so totals don’t depend on live product mutations
    nameSnapshot: { type: String, required: true },
    imageSnapshot: { type: String },
    priceSnapshot: { type: Number, required: true, min: 0 },
    lineTotal: { type: Number, required: true, min: 0 }, // priceSnapshot * quantity
  },
  { _id: false }
);

const CouponAppliedSchema = new mongoose.Schema(
  {
    code: String,
    type: { type: String, enum: ["percent", "flat"] }, // % off or flat amount
    amount: Number, // for 'percent' store like 10 for 10%
    maxDiscount: Number, // optional cap
  },
  { _id: false }
);

const CartSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", unique: true, index: true },
    items: { type: [CartItemSchema], default: [] },
    coupon: { type: CouponAppliedSchema, default: null },
    subtotal: { type: Number, required: true, default: 0 },
    discount: { type: Number, required: true, default: 0 },
    total: { type: Number, required: true, default: 0 },
  },
  { timestamps: true }
);

// helper to recompute monetary fields
CartSchema.methods.recalculateTotals = function () {
  this.items.forEach(i => { i.lineTotal = i.priceSnapshot * i.quantity; });
  this.subtotal = this.items.reduce((sum, i) => sum + i.lineTotal, 0);

  let discount = 0;
  if (this.coupon && this.subtotal > 0) {
    if (this.coupon.type === "percent") {
      discount = (this.subtotal * this.coupon.amount) / 100;
      if (this.coupon.maxDiscount) discount = Math.min(discount, this.coupon.maxDiscount);
    } else if (this.coupon.type === "flat") {
      discount = this.coupon.amount;
    }
    discount = Math.min(discount, this.subtotal); // no negative totals
  }

  this.discount = discount;
  this.total = this.subtotal - this.discount;
};

export default mongoose.model("Cart", CartSchema);