import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    image: String,
    category: String,
    description: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    isActive: {
      type: Boolean,
      default: true,
    },

    // 🆕 Inventory fields
    stock: {
      type: Number,
      required: true,
      default: 0, // start with 0 until stocked
      min: 0,
    },
    lowStockThreshold: {
      type: Number,
      default: 5, // triggers low stock alerts
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);

export default Product;