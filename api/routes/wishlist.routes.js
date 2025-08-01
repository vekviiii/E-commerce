import express from "express";
import {
  getWishlist,
  addToWishlist,
  removeFromWishlist,
} from "../controllers/wishlist.controller.js";
import isAuthenticated from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/wishllist", isAuthenticated, getWishlist);
router.post("/wishllist", isAuthenticated, addToWishlist);
router.delete("/wishllist/:productId", isAuthenticated, removeFromWishlist);

export default router;