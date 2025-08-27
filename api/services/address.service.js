import Address from "../models/address.model.js";

// Add new address
export const addAddressService = async (userId, addressData) => {
  if (addressData.isDefault) {
    await Address.updateMany({ userId }, { $set: { isDefault: false } });
  }
  const address = new Address({ ...addressData, userId });
  return await address.save();
};

// Edit address
export const editAddressService = async (addressId, userId, updateData) => {
  return await Address.findOneAndUpdate(
    { _id: addressId, userId },
    { $set: updateData },
    { new: true }
  );
};

// Delete address
export const deleteAddressService = async (addressId, userId) => {
  return await Address.findOneAndDelete({ _id: addressId, userId });
};

// Get user addresses
export const getUserAddressesService = async (userId) => {
  return await Address.find({ userId });
};

// Calculate shipping cost (simple example)
export const calculateShippingCostService = async (postalCode, weight) => {
  let baseCost = 50; // ₹50 flat
  let extraCharge = weight > 2 ? (weight - 2) * 20 : 0; // ₹20/kg above 2kg
  return baseCost + extraCharge;
};

// Track order (stub, integrate courier API later)
export const trackOrderService = async (trackingId) => {
  // Mocked response, replace with courier API call
  return {
    trackingId,
    status: "In Transit",
    expectedDelivery: "2025-08-30",
    history: [
      { date: "2025-08-25", location: "Delhi", status: "Shipped" },
      { date: "2025-08-26", location: "Lucknow", status: "In Transit" },
    ],
  };
};