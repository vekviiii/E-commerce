import {
  addReviewService,
  getReviewsByProductService,
  editReviewService,
  deleteReviewService
} from "../services/review.service.js";

export const addReview = async (req, res) => {
  try {
    const userId = req.user.id;
    const { productId, rating, comment } = req.body;
    const review = await addReviewService(userId, productId, rating, comment);
    res.status(201).json({ success: true, review });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

export const getReviewsByProduct = async (req, res) => {
  try {
    const reviews = await getReviewsByProductService(req.params.productId);
    res.json({ success: true, reviews });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const editReview = async (req, res) => {
  try {
    const userId = req.user.id;
    const isAdmin = req.user.role === "admin";
    const updated = await editReviewService(req.params.id, userId, req.body, isAdmin);
    if (!updated) return res.status(404).json({ success: false, message: "Review not found" });
    res.json({ success: true, review: updated });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

export const deleteReview = async (req, res) => {
  try {
    const userId = req.user.id;
    const isAdmin = req.user.role === "admin";
    const deleted = await deleteReviewService(req.params.id, userId, isAdmin);
    if (!deleted) return res.status(404).json({ success: false, message: "Review not found" });
    res.json({ success: true, message: "Review deleted" });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};