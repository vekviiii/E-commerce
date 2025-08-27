import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import "dotenv/config";
import express from "express";
import fs from "fs";
import path from "path";
import Razorpay from "razorpay";
import { fileURLToPath } from "url";
import connection from "./config/db.js";
import addressRoutes from "./routes/address.routes.js";
import adminRoutes from "./routes/admin.routes.js";
import authRoutes from "./routes/auth.routes.js";
import cartRoutes from "./routes/cart.routes.js";
import inventoryRoutes from "./routes/inventory.routes.js";
import orderRoutes from "./routes/order.routes.js";
import paymentRoutes from "./routes/payment.routes.js";
import productRoutes from "./routes/product.routes.js";
import reviewRoutes from "./routes/review.routes.js";
import uploadRoute from "./routes/upload.routes.js";
import wishlistRoutes from "./routes/wishlist.routes.js";
import errorHandler from "./utils/errorHandler.js";

const app = express();

if (!fs.existsSync("./uploads")) {
  fs.mkdirSync("./uploads");
}

connection();

//Razor instance
export var instance = new Razorpay({
  key_id: process.env.RAZOR_KEY_ID,
  key_secret: process.env.RAZOR_KEY_SECRET,
});

// Middleware
app.use(cors());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());
app.use(cookieParser());

app.use("/api", [
  productRoutes,
  authRoutes,
  uploadRoute,
  cartRoutes,
  wishlistRoutes,
  orderRoutes,
  paymentRoutes,
  addressRoutes,
  inventoryRoutes,
  reviewRoutes,
  adminRoutes,
]);

app.get("/", (req, res) => res.send("Connected"));

// Your 404 middleware (optional)
app.use((req, res, next) => {
  res.status(404);
  const error = new Error(`Not Found - ${req.originalUrl}`);
  next(error);
});

// global error handler
app.use(errorHandler);

// Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`API connected at port: ${PORT}`));
