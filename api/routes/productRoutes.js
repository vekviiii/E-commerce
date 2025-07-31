import { Router } from "express";
import {
  PostProduct,
  DeleteProduct,
  UpdateProduct,
  GetProductById,
  processPayment,
  getKey,
  paymentVerification,
  getSearchedProducts,
  GetProducts,
} from "../controllers/productController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import isAdmin from "../middleware/isAdmin.js";

const route = Router();

//GET
route.get("/products", authMiddleware, GetProducts);
route.get("/product/:id", GetProductById);
route.get("/getKey", getKey);

//SEARCH PRODUCT BY KEYWORD
route.get("/search", authMiddleware, getSearchedProducts);

//POST
route.post("/product", authMiddleware, isAdmin, PostProduct);
// payment
route.post("/payment", processPayment);
route.post("/paymentVerification", paymentVerification);

//UPDATE
route.put("/product/:id", authMiddleware, isAdmin, UpdateProduct);

//DELETE
route.delete("/product/:id", authMiddleware, isAdmin, DeleteProduct);

export default route;
