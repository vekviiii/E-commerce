import express from "express";
import {
  processPayment,
  getKey,
  paymentVerification,
  razorpayWebhook,
  savePaymentMethod,
  chargeSavedMethod,
} from "../controllers/payment.controller.js";

const router = express.Router();

router.post("/payment/process", processPayment);
router.get("/payment/key", getKey);
router.post("/payment/verify", paymentVerification);
router.post("/payment/webhook", express.json({ type: "*/*" }), razorpayWebhook);
router.post("/payment/save-method", savePaymentMethod);
router.post("/payment/charge-saved", chargeSavedMethod);

export default router;