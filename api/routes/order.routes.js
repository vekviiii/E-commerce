import express from "express";
import * as orderController from "../controllers/order.controller.js";
import authMiddleware from "../middleware/authMiddleware.js";
import isAdmin from "../middleware/isAdmin.js";

const router = express.Router();

router.post("/order", authMiddleware, orderController.createOrder);
router.get("/order/:id", authMiddleware, orderController.getOrderById);
router.get("/orders/user/:id", authMiddleware, orderController.getOrdersForUser);
router.put("/order/:id/status", authMiddleware, isAdmin, orderController.updateOrderStatus);
router.put("/order/:id/cancel", authMiddleware, orderController.cancelOrReturnOrder);
router.put("/order/:id/coupon", authMiddleware, orderController.applyCoupon);

export default router;