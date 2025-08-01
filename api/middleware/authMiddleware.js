import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const authMiddleware = async (req, res, next) => {
  const token =
    req.headers.authorization?.split(" ")[1] || req.cookies.accessToken;

  if (!token) {
    return res.status(401).json("Unauthorized");
  }

  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decode.id).select("role");
    if (!user) {
      return res.status(404).json("User not found");
    }
    req.user = { id: decode.id, role: user.role };
    next();
  } catch (error) {
    return res.status(401).json("Invalid or expired token");
  }
};

export default authMiddleware;
