import Review from "../models/review.model.js";
import Product from "../models/product.model.js";

// Add or update review
export const addReviewService = async (userId, productId, rating, comment) => {
  const review = await Review.findOneAndUpdate(
    { userId, productId },
    { rating, comment },
    { new: true, upsert: true, setDefaultsOnInsert: true }
  );

  // Recalculate average rating
  const avg = await Review.aggregate([
    { $match: { productId: review.productId } },
    { $group: { _id: "$productId", avgRating: { $avg: "$rating" } } }
  ]);

  if (avg.length > 0) {
    await Product.findByIdAndUpdate(productId, { rating: avg[0].avgRating });
  }

  return review;
};

// Get reviews for a product
export const getReviewsByProductService = async (productId) => {
  return await Review.find({ productId }).populate("userId", "name email");
};

// Edit review
export const editReviewService = async (reviewId, userId, updates, isAdmin) => {
  const filter = isAdmin ? { _id: reviewId } : { _id: reviewId, userId };
  return await Review.findOneAndUpdate(filter, updates, { new: true });
};

// Delete review
export const deleteReviewService = async (reviewId, userId, isAdmin) => {
  const filter = isAdmin ? { _id: reviewId } : { _id: reviewId, userId };
  return await Review.findOneAndDelete(filter);
};