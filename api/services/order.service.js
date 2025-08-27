import Order from "../models/order.model.js";

export const createOrder = async (orderData) => {
  const order = new Order(orderData);
  return await order.save();
};

export const getOrderById = async (orderId) => {
  return await Order.findById(orderId).populate("user").populate("items.product");
};

export const getOrdersForUser = async (userId) => {
  return await Order.find({ user: userId }).populate("items.product");
};

export const updateOrderStatus = async (orderId, status) => {
  return await Order.findByIdAndUpdate(orderId, { status }, { new: true });
};

export const cancelOrReturnOrder = async (orderId, status) => {
  if (!["Cancelled", "Returned"].includes(status)) {
    throw new Error("Invalid status for cancellation/return");
  }
  return await Order.findByIdAndUpdate(orderId, { status }, { new: true });
};

export const applyCouponToOrder = async (orderId, couponCode, discountAmount) => {
  return await Order.findByIdAndUpdate(
    orderId,
    { coupon: { code: couponCode, discountAmount } },
    { new: true }
  );
};