import express from "express";
import {
    getInventoryLogs,
    getLowStockProducts,
    restockProduct,
    updateStockOnPurchase,
} from "../controllers/inventory.controller.js";
import authMiddleware from "../middleware/authMiddleware.js";
import isAdmin from "../middleware/isAdmin.js";

const router = express.Router();

// Purchase (reduce stock)
router.post("/inventory/purchase", authMiddleware, updateStockOnPurchase);

// Admin only
router.get("/inventory/low-stock", authMiddleware, isAdmin, getLowStockProducts);
router.post("/inventory/restock", authMiddleware, isAdmin, restockProduct);
router.get("/inventory/logs", authMiddleware, isAdmin, getInventoryLogs);

export default router;
