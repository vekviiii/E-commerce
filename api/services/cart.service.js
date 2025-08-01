import Cart from "../models/cart.model.js";
import Product from "../models/product.model.js";
import Coupon from "../models/coupon.model.js";

async function getOrCreateCart(userId) {
  let cart = await Cart.findOne({ user: userId });
  if (!cart) cart = await Cart.create({ user: userId, items: [] });
  return cart;
}

export async function getCart(userId) {
  const cart = await getOrCreateCart(userId);
  return cart;
}

export async function addItem(userId, productId, qty = 1) {
  if (qty < 1) qty = 1;

  const product = await Product.findById(productId).lean();
  // if (!product || !product.isActive) { // when you use start using product.isActive
  if (!product) {
    const err = new Error("Product not found or inactive");
    err.statusCode = 404;
    throw err;
  }
  if (product.stock < qty) {
    const err = new Error("Insufficient stock");
    err.statusCode = 400;
    throw err;
  }

  const cart = await getOrCreateCart(userId);

  const idx = cart.items.findIndex(
    (i) => String(i.product) === String(productId)
  );
  if (idx > -1) {
    cart.items[idx].quantity += qty;
    cart.items[idx].priceSnapshot = product.price; // refresh snapshot to latest (optional)
  } else {
    cart.items.push({
      product: product._id,
      quantity: qty,
      nameSnapshot: product.name,
      imageSnapshot: product.image,
      priceSnapshot: product.price,
      lineTotal: 0,
    });
  }

  // remove coupon when items change (optional business rule)
  // cart.coupon = null;

  cart.recalculateTotals();
  await cart.save();
  return cart;
}

export async function updateItemQuantity(userId, productId, qty) {
  const cart = await getOrCreateCart(userId);
  const idx = cart.items.findIndex(
    (i) => String(i.product) === String(productId)
  );
  if (idx === -1) {
    const err = new Error("Item not in cart");
    err.statusCode = 404;
    throw err;
  }

  if (qty <= 0) {
    cart.items.splice(idx, 1);
  } else {
    // validate stock against current product
    const product = await Product.findById(productId).lean();
    // if (!product || !product.isActive) {
    if (!product) {
      const err = new Error("Product not found or inactive");
      err.statusCode = 404;
      throw err;
    }
    if (product.stock < qty) {
      const err = new Error("Insufficient stock");
      err.statusCode = 400;
      throw err;
    }
    cart.items[idx].quantity = qty;
    // keep snapshot; or refresh to latest price:
    cart.items[idx].priceSnapshot = product.price; // optional, your call
  }

  cart.recalculateTotals();
  await cart.save();
  return cart;
}

export async function removeItem(userId, productId) {
  const cart = await getOrCreateCart(userId);
  const before = cart.items.length;
  cart.items = cart.items.filter(
    (i) => String(i.product) !== String(productId)
  );
  if (cart.items.length === before) {
    const err = new Error("Item not in cart");
    err.statusCode = 404;
    throw err;
  }
  cart.recalculateTotals();
  await cart.save();
  return cart;
}

export async function clearCart(userId) {
  const cart = await getOrCreateCart(userId);
  cart.items = [];
  cart.coupon = null;
  cart.recalculateTotals();
  await cart.save();
  return cart;
}

export async function applyCoupon(userId, code) {
  const cart = await getOrCreateCart(userId);
  if (!cart.items.length) {
    const err = new Error("Cart is empty");
    err.statusCode = 400;
    throw err;
  }

  const coupon = await Coupon.findOne({
    code: code.toUpperCase(),
    isActive: true,
  }).lean();
  if (!coupon) {
    const err = new Error("Invalid coupon");
    err.statusCode = 404;
    throw err;
  }
  const now = new Date();
  if (
    (coupon.startsAt && coupon.startsAt > now) ||
    (coupon.endsAt && coupon.endsAt < now)
  ) {
    const err = new Error("Coupon not valid at this time");
    err.statusCode = 400;
    throw err;
  }

  // Set temporarily then recompute to check minCartValue
  cart.coupon = {
    code: coupon.code,
    type: coupon.type,
    amount: coupon.amount,
    maxDiscount: coupon.maxDiscount,
  };
  cart.recalculateTotals();

  if (coupon.minCartValue && cart.subtotal < coupon.minCartValue) {
    const err = new Error(`Minimum cart value is ${coupon.minCartValue}`);
    err.statusCode = 400;
    // revert coupon
    cart.coupon = null;
    cart.recalculateTotals();
    throw err;
  }

  await cart.save();
  return cart;
}
