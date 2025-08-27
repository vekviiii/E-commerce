import Product from "../models/product.model.js";
import InventoryLog from "../models/inventoryLog.model.js";

// Update stock on purchase
export const updateStockOnPurchaseService = async (productId, quantity) => {
  const product = await Product.findById(productId);
  if (!product) throw new Error("Product not found");

  if (product.stock < quantity) throw new Error("Insufficient stock");

  product.stock -= quantity;
  await product.save();

  await InventoryLog.create({
    productId,
    changeType: "PURCHASE",
    quantityChanged: -quantity,
    newStock: product.stock,
    note: "Stock reduced on purchase"
  });

  return product;
};

// Low stock alerts
export const getLowStockProductsService = async () => {
  return await Product.find({ $expr: { $lte: ["$stock", "$lowStockThreshold"] } });
};

// Restock inventory
export const restockProductService = async (productId, quantity, note) => {
  const product = await Product.findById(productId);
  if (!product) throw new Error("Product not found");

  product.stock += quantity;
  await product.save();

  await InventoryLog.create({
    productId,
    changeType: "RESTOCK",
    quantityChanged: quantity,
    newStock: product.stock,
    note: note || "Manual restock"
  });

  return product;
};

// Get inventory logs
export const getInventoryLogsService = async () => {
  return await InventoryLog.find().populate("productId", "name");
};