import express from "express";
import {
  addAddress,
  editAddress,
  deleteAddress,
  getUserAddresses,
  calculateShippingCost,
  trackOrder,
} from "../controllers/address.controller.js";

const router = express.Router();

router.post("/address", addAddress);
router.put("/address/:id", editAddress);
router.delete("/address/:id", deleteAddress);
router.get("/address", getUserAddresses);
router.post("/address/shipping-cost", calculateShippingCost);
router.get("/address/track/:trackingId", trackOrder);

export default router;