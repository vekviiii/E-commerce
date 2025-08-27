import Coupon from "../models/coupon.model.js";
import Discount from "../models/discount.model.js";
import Tax from "../models/tax.model.js";

// 📊 User Stats
export const getUserStats = async () => {
  return { totalUsers: 500, activeUsers: 350, newUsersThisMonth: 50 };
};
export const getUserGrowth = async () => {
  return [
    { date: "2025-08-01", count: 10 },
    { date: "2025-08-02", count: 20 },
  ];
};

// 📦 Orders
export const getOrderStats = async () => {
  return { totalOrders: 1200, pending: 100, completed: 1000, cancelled: 100 };
};
export const getOrderTrends = async () => {
  return [
    { date: "2025-08-01", orders: 30 },
    { date: "2025-08-02", orders: 45 },
  ];
};

// 🛒 Products
export const getTopProducts = async () => {
  return [{ product: "iPhone 15", sales: 200 }];
};
export const getProductPerformance = async (id) => {
  return { id, sales: 50, revenue: 50000 };
};
export const getLowStockProducts = async () => {
  return [{ product: "Macbook Pro", stock: 3 }];
};

// 💰 Revenue
export const getRevenueStats = async () => {
  return { totalRevenue: 200000, profit: 50000 };
};
export const getRevenueTrends = async () => {
  return [
    { date: "2025-08-01", revenue: 10000 },
    { date: "2025-08-02", revenue: 15000 },
  ];
};
export const getRevenueByCategory = async () => {
  return [
    { category: "Electronics", revenue: 150000 },
    { category: "Clothing", revenue: 50000 },
  ];
};

// 🎟 Coupons
export const createCoupon = async (data) => await Coupon.create(data);
export const getCoupons = async () => await Coupon.find();
export const updateCoupon = async (id, data) =>
  await Coupon.findByIdAndUpdate(id, data, { new: true });
export const deleteCoupon = async (id) => await Coupon.findByIdAndDelete(id);

// 💸 Discounts
export const createDiscount = async (data) => await Discount.create(data);
export const getDiscounts = async () => await Discount.find();
export const updateDiscount = async (id, data) =>
  await Discount.findByIdAndUpdate(id, data, { new: true });
export const deleteDiscount = async (id) => await Discount.findByIdAndDelete(id);

// 🏦 Tax
export const createTax = async (data) => await Tax.create(data);
export const getTax = async () => await Tax.find();
export const updateTax = async (id, data) =>
  await Tax.findByIdAndUpdate(id, data, { new: true });
export const deleteTax = async (id) => await Tax.findByIdAndDelete(id);