import {
  updateStockOnPurchaseService,
  getLowStockProductsService,
  restockProductService,
  getInventoryLogsService
} from "../services/inventory.service.js";

export const updateStockOnPurchase = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const product = await updateStockOnPurchaseService(productId, quantity);
    res.json({ success: true, product });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

export const getLowStockProducts = async (req, res) => {
  try {
    const products = await getLowStockProductsService();
    res.json({ success: true, lowStock: products });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const restockProduct = async (req, res) => {
  try {
    const { productId, quantity, note } = req.body;
    const product = await restockProductService(productId, quantity, note);
    res.json({ success: true, product });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

export const getInventoryLogs = async (req, res) => {
  try {
    const logs = await getInventoryLogsService();
    res.json({ success: true, logs });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};