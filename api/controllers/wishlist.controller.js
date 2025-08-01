import {
  getWishlistItems,
  addProductToWishlist,
  removeProductFromWishlist,
} from "../services/wishlist.service.js";

// GET /api/wishlist
export const getWishlist = async (req, res) => {
  try {
    const items = await getWishlistItems(req.user.id);
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// POST /api/wishlist
export const addToWishlist = async (req, res) => {
  try {
    const wishlist = await addProductToWishlist(req.user.id, req.body.productId);
    res.status(200).json(wishlist);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE /api/wishlist/:productId
export const removeFromWishlist = async (req, res) => {
  try {
    const wishlist = await removeProductFromWishlist(req.user.id, req.params.productId);
    res.status(200).json(wishlist);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};