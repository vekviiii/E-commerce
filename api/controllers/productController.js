import {
  createProduct,
  deleteProductById,
  getProductById,
  getProducts,
  updateProduct,
} from "../services/productService.js";
import { instance } from "../server.js";
import crypto from "crypto";

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

export const UpdateProduct = async (req, res) => {
  k;
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

export const processPayment = async (req, res) => {
  try {
    // Open Razorpay Checkout
    const options = {
      amount: Number(req.body.price * 100),
      currency: "INR",
    };

    const order = await instance.orders.create(options);
    res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    res.status(500).json(`error: ${error.message}`);
  }
};

export const getKey = async (req, res) => {
  res.status(200).json({
    key: process.env.RAZOR_KEY_ID,
  });
};

export const paymentVerification = async (req, res) => {
  try {
    const { razorpay_payment_id, razorpay_order_id, razorpay_signature } =
      req.body;

    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto.createHmac('sha256', process.env.RAZOR_KEY_SECRET)
    .update(body.toString()).digest("hex")
    
    if (expectedSignature === razorpay_signature) {
      res.redirect(`http://localhost:5173/paymentSuccess?reference=${razorpay_payment_id}`)
    }
    else
    {
    res.status(404).json({
      success: false
    });
    }

  } catch (error) {
    res.status(500).json(`error : ${error.message}`);
  }
};
