import * as orderService from "../services/order.service.js";

// ✅ Create Order
export const createOrder = async (req, res) => {
  try {
    const order = await orderService.createOrder({ ...req.body, user: req.user.id });
    res.status(201).json(order);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// ✅ Get Order by ID
export const getOrderById = async (req, res) => {
  try {
    const order = await orderService.getOrderById(req.params.id);
    if (!order) return res.status(404).json({ message: "Order not found" });
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Get All Orders for User
export const getOrdersForUser = async (req, res) => {
  try {
    const orders = await orderService.getOrdersForUser(req.user.id);
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Update Order Status (Admin)
export const updateOrderStatus = async (req, res) => {
  try {
    const order = await orderService.updateOrderStatus(req.params.id, req.body.status);
    res.json(order);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// ✅ Cancel or Return Order
export const cancelOrReturnOrder = async (req, res) => {
  try {
    const order = await orderService.cancelOrReturnOrder(req.params.id, req.body.status);
    res.json(order);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// ✅ Apply Coupon / Discount
export const applyCoupon = async (req, res) => {
  try {
    const order = await orderService.applyCouponToOrder(
      req.params.id,
      req.body.code,
      req.body.discountAmount
    );
    res.json(order);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};