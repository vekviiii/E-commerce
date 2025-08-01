import { Router } from "express";
import {
    addToCart,
    applyCartCoupon,
    clearMyCart,
    getMyCart,
    removeCartItem,
    updateCartItem,
} from "../controllers/cart.controller.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = Router();

// All routes require auth
router.use(authMiddleware);

// Cart CRUD
router.get("/cart", getMyCart);
router.post("/cart/items", addToCart); // body: { productId, quantity? }
router.patch("/cart/items/:productId", updateCartItem); // body: { quantity }
router.delete("/cart/items/:productId", removeCartItem);
router.delete("/cart", clearMyCart);

// Coupon
router.post("/apply-coupon", applyCartCoupon); // body: { code }

export default router;
