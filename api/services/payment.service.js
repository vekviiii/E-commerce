import crypto from "crypto";
import Razorpay from "razorpay";
import PaymentMethod from "../models/payment.model.js"; // optional if saving methods

const instance = new Razorpay({
  key_id: process.env.RAZOR_KEY_ID,
  key_secret: process.env.RAZOR_KEY_SECRET,
});

// Create order
export const createOrderService = async (price) => {
  const options = {
    amount: Number(price * 100),
    currency: "INR",
  };
  return await instance.orders.create(options);
};

// Verify payment
export const verifyPaymentService = (orderId, paymentId, signature) => {
  const body = orderId + "|" + paymentId;
  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZOR_KEY_SECRET)
    .update(body.toString())
    .digest("hex");

  return expectedSignature === signature;
};

// Handle webhook
export const handleWebhookService = (payload, signature) => {
  const shasum = crypto.createHmac("sha256", process.env.RAZOR_WEBHOOK_SECRET);
  shasum.update(JSON.stringify(payload));
  const digest = shasum.digest("hex");

  if (digest === signature) {
    return { verified: true, event: payload.event, data: payload.payload };
  } else {
    return { verified: false };
  }
};

// Save payment method (optional)
export const savePaymentMethodService = async (data) => {
  const { customer_id, token_id, card_info } = data;

  return await PaymentMethod.create({
    customerId: customer_id,
    tokenId: token_id,
    last4: card_info.last4,
    cardType: card_info.type,
    expiry: card_info.expiry,
  });
};

// Charge saved method (optional)
export const chargeSavedMethodService = async (data) => {
  const { amount, currency, customer_id, token_id } = data;

  // 1. Create an order first
  const order = await instance.orders.create({
    amount: amount * 100,
    currency: currency || "INR",
    receipt: `receipt_${Date.now()}`,
    customer_id,
  });

  // 2. Call Payments API manually (Razorpay doesn’t expose it in SDK)
  const payment = await axios.post(
    "https://api.razorpay.com/v1/payments/create/json",
    {
      amount: amount * 100,
      currency: currency || "INR",
      order_id: order.id,
      customer_id,
      token: token_id,
      capture: true,
    },
    {
      auth: {
        username: process.env.RAZOR_KEY_ID,
        password: process.env.RAZOR_KEY_SECRET,
      },
    }
  );

  return payment.data;
};