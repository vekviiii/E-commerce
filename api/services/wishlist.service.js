import Wishlist from "../models/wishlist.model.js";
import Product from "../models/product.model.js";

export const getWishlistItems = async (userId) => {
  const wishlist = await Wishlist.findOne({ user: userId }).populate("items");
  return wishlist?.items || [];
};

export const addProductToWishlist = async (userId, productId) => {
  const product = await Product.findById(productId);
  if (!product) throw new Error("Product not found");

  let wishlist = await Wishlist.findOne({ user: userId });

  if (!wishlist) {
    wishlist = await Wishlist.create({ user: userId, items: [productId] });
  } else {
    if (!wishlist.items.includes(productId)) {
      wishlist.items.push(productId);
      await wishlist.save();
    }
  }

  return wishlist;
};

export const removeProductFromWishlist = async (userId, productId) => {
  const wishlist = await Wishlist.findOne({ user: userId });
  if (!wishlist) throw new Error("Wishlist not found");

  wishlist.items = wishlist.items.filter(
    (item) => item.toString() !== productId
  );

  await wishlist.save();
  return wishlist;
};