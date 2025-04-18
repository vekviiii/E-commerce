import Product from "../models/product.js";

export const createProduct = async (productData) => {
  if (!productData) {
    throw new Error("no product data provided");
  }

  const response = await Product.create(productData);
  return response;
};

export const getProducts = async () => {
  const products = await Product.find();
  return products;
};

export const deleteProductById = async (id) => {
  const result = await Product.findByIdAndDelete(id);
  if (!result) throw new Error("Product not found");
  return result;
};

export const updateProduct = async (id, updateData) => {
  if (!id) {
    throw new Error("Product ID is required");
  }

  const result = await Product.findByIdAndUpdate(id, updateData, {
    new: true,
    runValidators: true
  });

  if (!result) {
    throw new Error("Product not found or no changes made");
  }
  return result;
};

export const getProductById = async (_id) => {
  if (!_id) {
    throw new Error("Product ID is required");
  }

  const product = await Product.findById(_id);
  return product;
};
