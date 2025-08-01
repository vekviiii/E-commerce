import {
  getCart,
  addItem,
  updateItemQuantity,
  removeItem,
  clearCart,
  applyCoupon
} from "../services/cart.service.js";

export const getMyCart = async (req, res, next) => {
  try {
    const cart = await getCart(req.user.id);
    res.status(200).json(cart);
  } catch (err) { next(err); }
};

export const addToCart = async (req, res, next) => {
  try {
    const { productId, quantity } = req.body;
    const cart = await addItem(req.user.id, productId, Number(quantity || 1));
    res.status(200).json(cart);
  } catch (err) { next(err); }
};

export const updateCartItem = async (req, res, next) => {
  try {
    const { productId } = req.params;
    const { quantity } = req.body;
    const cart = await updateItemQuantity(req.user.id, productId, Number(quantity));
    res.status(200).json(cart);
  } catch (err) { next(err); }
};

export const removeCartItem = async (req, res, next) => {
  try {
    const { productId } = req.params;
    const cart = await removeItem(req.user.id, productId);
    res.status(200).json(cart);
  } catch (err) { next(err); }
};

export const clearMyCart = async (req, res, next) => {
  try {
    const cart = await clearCart(req.user.id);
    res.status(200).json(cart);
  } catch (err) { next(err); }
};

export const applyCartCoupon = async (req, res, next) => {
  try {
    const { code } = req.body;
    const cart = await applyCoupon(req.user.id, code);
    res.status(200).json(cart);
  } catch (err) { next(err); }
};