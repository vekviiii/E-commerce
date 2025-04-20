import { trusted } from "mongoose";
import {
  createProduct,
  deleteProductById,
  getProductById,
  getProducts,
  updateProduct,
} from "../services/productService.js";

export const PostProduct = async (req, res) => {
  try {
    const product = await createProduct(req.body);
    res.status(200).json(product);
  } catch (error) {
    res.status(400).json(`error: ${error.message}`);
  }
};

export const GetProduct = async (req, res) => {
  try {
    const product = await getProducts();
    res.status(200).json(product);
  } catch (error) {
    res.status(404).json(`error: ${error.message}`);
  }
};

export const DeleteProduct = async (req, res) => {
  try {
    const deleted = await deleteProductById(req.params.id);
    res.status(200).json({ message: "Deleted successfully", deleted });
  } catch (error) {
    res.status(404).json({ message: `error: ${error.message}` });
  }
};

export const UpdateProduct = async (req, res) => {k
  try {
    const { id } = req.params;
    const updateData = req.body;

    const response = await updateProduct(id, updateData);

    res.status(200).json(response);
  } catch (error) {
    const status = error.message.includes("not found") ? 404 : 400;
    res.status(status).json(`error: ${error.message}`);
  }
};

export const GetProductById = async (req, res) => {
  try {
    const product = await getProductById(req.params.id);

    if (!product) {
      res.status(404).json(`Product not found`);
    }

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json(`error: ${error.message}`);
  }
};
