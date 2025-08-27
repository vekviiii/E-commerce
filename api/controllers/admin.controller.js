import * as AdminService from "../services/admin.service.js";

// 📊 User Stats
export const getUserStats = async (req, res) => {
  try {
    const stats = await AdminService.getUserStats();
    res.json(stats);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
export const getUserGrowth = async (req, res) => {
  try {
    const growth = await AdminService.getUserGrowth();
    res.json(growth);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 📦 Orders
export const getOrderStats = async (req, res) => {
  try {
    const stats = await AdminService.getOrderStats();
    res.json(stats);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
export const getOrderTrends = async (req, res) => {
  try {
    const trends = await AdminService.getOrderTrends();
    res.json(trends);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 🛒 Products
export const getTopProducts = async (req, res) => {
  try {
    const products = await AdminService.getTopProducts();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
export const getProductPerformance = async (req, res) => {
  try {
    const product = await AdminService.getProductPerformance(req.params.id);
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
export const getLowStockProducts = async (req, res) => {
  try {
    const products = await AdminService.getLowStockProducts();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 💰 Revenue
export const getRevenueStats = async (req, res) => {
  try {
    const stats = await AdminService.getRevenueStats();
    res.json(stats);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
export const getRevenueTrends = async (req, res) => {
  try {
    const trends = await AdminService.getRevenueTrends();
    res.json(trends);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
export const getRevenueByCategory = async (req, res) => {
  try {
    const data = await AdminService.getRevenueByCategory();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 🎟 Coupons
export const createCoupon = async (req, res) => {
  try {
    const coupon = await AdminService.createCoupon(req.body);
    res.status(201).json(coupon);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
export const getCoupons = async (req, res) => {
  try {
    const coupons = await AdminService.getCoupons();
    res.json(coupons);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
export const updateCoupon = async (req, res) => {
  try {
    const coupon = await AdminService.updateCoupon(req.params.id, req.body);
    res.json(coupon);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
export const deleteCoupon = async (req, res) => {
  try {
    await AdminService.deleteCoupon(req.params.id);
    res.json({ message: "Coupon deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 💸 Discounts
export const createDiscount = async (req, res) => {
  try {
    const discount = await AdminService.createDiscount(req.body);
    res.status(201).json(discount);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
export const getDiscounts = async (req, res) => {
  try {
    const discounts = await AdminService.getDiscounts();
    res.json(discounts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
export const updateDiscount = async (req, res) => {
  try {
    const discount = await AdminService.updateDiscount(req.params.id, req.body);
    res.json(discount);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
export const deleteDiscount = async (req, res) => {
  try {
    await AdminService.deleteDiscount(req.params.id);
    res.json({ message: "Discount deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 🏦 Tax
export const createTax = async (req, res) => {
  try {
    const tax = await AdminService.createTax(req.body);
    res.status(201).json(tax);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
export const getTax = async (req, res) => {
  try {
    const tax = await AdminService.getTax();
    res.json(tax);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
export const updateTax = async (req, res) => {
  try {
    const tax = await AdminService.updateTax(req.params.id, req.body);
    res.json(tax);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
export const deleteTax = async (req, res) => {
  try {
    await AdminService.deleteTax(req.params.id);
    res.json({ message: "Tax deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};