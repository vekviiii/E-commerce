import mongoose from "mongoose";

const CouponSchema = new mongoose.Schema(
  {
    //   code: { type: String, required: true, unique: true, uppercase: true, trim: true },
    //   type: { type: String, enum: ["percent", "flat"], required: true },
    //   amount: { type: Number, required: true, min: 0 },
    //   maxDiscount: { type: Number }, // cap for percent coupons
    //   minCartValue: { type: Number, default: 0 },
    //   isActive: { type: Boolean, default: true },
    //   startsAt: { type: Date },
    //   endsAt: { type: Date },
    code: { type: String, required: true, unique: true },
    type: { type: String, enum: ["percent", "flat"], required: true },
    discount: { type: Number, required: true },
    expiresAt: { type: Date, required: true },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.model("Coupon", CouponSchema);