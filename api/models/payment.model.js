import mongoose from "mongoose";

const paymentMethodSchema = new mongoose.Schema(
  {
    customerId: {
      type: String,
      required: true,
    },
    tokenId: {
      type: String,
      required: true,
    },
    last4: {
      type: String,
      required: true,
    },
    cardType: {
      type: String,
      enum: ["credit", "debit", "prepaid", "upi", "netbanking"],
      required: true,
    },
    expiry: {
      type: String, // format: MM/YY or MM/YYYY
      required: true,
    },
    provider: {
      type: String, // e.g. "Visa", "MasterCard", "Rupay", "UPI"
    },
    isDefault: {
      type: Boolean,
      default: false,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const PaymentMethod = mongoose.model("PaymentMethod", paymentMethodSchema);

export default PaymentMethod;