import { Router } from "express";
import { uploadImage } from "../controllers/upload.controller.js";
import { upload } from "../middleware/uploadMiddleware.js";

const route = Router();

route.post("/imageUpload", upload.single("image"), uploadImage);

export default route;