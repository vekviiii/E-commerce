import {
  createOrderService,
  verifyPaymentService,
  handleWebhookService,
  savePaymentMethodService,
  chargeSavedMethodService,
} from "../services/payment.service.js";

// Initiate Payment
export const processPayment = async (req, res) => {
  try {
    const order = await createOrderService(req.body.price);
    res.status(200).json({ success: true, order });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get Razorpay Key
export const getKey = (req, res) => {
  res.status(200).json({ key: process.env.RAZOR_KEY_ID });
};

// Verify Payment
export const paymentVerification = async (req, res) => {
  try {
    const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = req.body;

    const isValid = verifyPaymentService(
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature
    );

    if (isValid) {
      res.redirect(
        `http://localhost:5173/paymentSuccess?reference=${razorpay_payment_id}`
      );
    } else {
      res.status(400).json({ success: false, message: "Invalid signature" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Handle Webhook
export const razorpayWebhook = async (req, res) => {
  try {
    const signature = req.headers["x-razorpay-signature"];
    const result = handleWebhookService(req.body, signature);

    if (!result.verified) {
      return res.status(400).json({ status: "invalid signature" });
    }

    // Handle different events
    if (result.event === "payment.captured") {
      console.log("✅ Payment Captured:", result.data.payment.entity);
      // Save to DB / update order status
    } else if (result.event === "payment.failed") {
      console.log("❌ Payment Failed:", result.data.payment.entity);
      // Mark failed in DB
    }

    res.status(200).json({ status: "ok" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Save Payment Method
export const savePaymentMethod = async (req, res) => {
  try {
    const saved = await savePaymentMethodService(req.body);
    res.status(200).json({ success: true, saved });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Charge Saved Method
export const chargeSavedMethod = async (req, res) => {
  try {
    const payment = await chargeSavedMethodService(req.body);
    res.status(200).json({ success: true, payment });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
