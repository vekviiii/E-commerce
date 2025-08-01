import { Router } from "express";
import { login, logout, refreshToken, register, resetPassword } from "../controllers/auth.controller.js";

const route = Router();

route.post("/register", register);
route.post("/login", login);
route.post("/logout", logout);
route.post("/refreshToken", refreshToken);
route.post("/resetPassword", resetPassword);

export default route;