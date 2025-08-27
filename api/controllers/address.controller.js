import {
  addAddressService,
  editAddressService,
  deleteAddressService,
  getUserAddressesService,
  calculateShippingCostService,
  trackOrderService,
} from "../services/address.service.js";

export const addAddress = async (req, res) => {
  try {
    const userId = req.user.id; // assuming auth middleware
    const address = await addAddressService(userId, req.body);
    res.status(201).json({ success: true, address });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const editAddress = async (req, res) => {
  try {
    const userId = req.user.id;
    const updated = await editAddressService(req.params.id, userId, req.body);
    if (!updated) return res.status(404).json({ success: false, message: "Address not found" });
    res.json({ success: true, address: updated });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const deleteAddress = async (req, res) => {
  try {
    const userId = req.user.id;
    const deleted = await deleteAddressService(req.params.id, userId);
    if (!deleted) return res.status(404).json({ success: false, message: "Address not found" });
    res.json({ success: true, message: "Address deleted" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const getUserAddresses = async (req, res) => {
  try {
    const userId = req.user.id;
    const addresses = await getUserAddressesService(userId);
    res.json({ success: true, addresses });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const calculateShippingCost = async (req, res) => {
  try {
    const { postalCode, weight } = req.body;
    const cost = await calculateShippingCostService(postalCode, weight);
    res.json({ success: true, shippingCost: cost });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const trackOrder = async (req, res) => {
  try {
    const { trackingId } = req.params;
    const status = await trackOrderService(trackingId);
    res.json({ success: true, tracking: status });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};