import express from "express";
import {
  addReview,
  getReviewsByProduct,
  editReview,
  deleteReview
} from "../controllers/review.controller.js";

const router = express.Router();

router.post("/reviews", addReview);
router.get("/reviews/:productId", getReviewsByProduct);
router.put("/reviews/:id", editReview);
router.delete("/reviews/:id", deleteReview);

export default router;