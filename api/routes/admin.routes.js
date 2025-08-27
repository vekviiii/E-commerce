import express from "express";
import {
  getUserStats,
  getUserGrowth,
  getOrderStats,
  getOrderTrends,
  getTopProducts,
  getProductPerformance,
  getLowStockProducts,
  getRevenueStats,
  getRevenueTrends,
  getRevenueByCategory,
  createCoupon,
  getCoupons,
  updateCoupon,
  deleteCoupon,
  createDiscount,
  getDiscounts,
  updateDiscount,
  deleteDiscount,
  createTax,
  getTax,
  updateTax,
  deleteTax,
} from "../controllers/admin.controller.js";

const router = express.Router();

// 📊 User Stats
router.get("/admin/stats/users", getUserStats);
router.get("/admin/stats/users-growth", getUserGrowth);

// 📦 Orders
router.get("/admin/stats/orders", getOrderStats);
router.get("/admin/stats/orders-trends", getOrderTrends);

// 🛒 Products
router.get("/admin/stats/products", getTopProducts);
router.get("/admin/stats/products/:id", getProductPerformance);
router.get("/admin/stats/products/low-stock", getLowStockProducts);

// 💰 Revenue
router.get("/admin/stats/revenue", getRevenueStats);
router.get("/admin/stats/revenue-trends", getRevenueTrends);
router.get("/admin/stats/revenue-by-category", getRevenueByCategory);

// 🎟 Coupons
router.post("/admin/coupons", createCoupon);
router.get("/admin/coupons", getCoupons);
router.put("/admin/coupons/:id", updateCoupon);
router.delete("/admin/coupons/:id", deleteCoupon);

// 💸 Discounts
router.post("/admin/discounts", createDiscount);
router.get("/admin/discounts", getDiscounts);
router.put("/admin/discounts/:id", updateDiscount);
router.delete("/admin/discounts/:id", deleteDiscount);

// 🏦 Tax
router.post("/admin/tax", createTax);
router.get("/admin/tax", getTax);
router.put("/admin/tax/:id", updateTax);
router.delete("/admin/tax/:id", deleteTax);

export default router;