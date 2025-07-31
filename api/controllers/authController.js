import { loginUser, registerUser } from "../services/authService.js";
import { setAuthCookie, clearAuthCookie } from "../utils/setAuthCookie.js";
import jwt from "jsonwebtoken";

// Register
export const register = async (req, res) => {
  try {
    const newUser = await registerUser(req.body);

    res.status(201).json({
      message: "User registered successfully!",
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
      },
    });
  } catch (error) {
    console.error("Registration error:", error.message);
    res.status(400).json({ error: "Registration failed. Please try again." });
  }
};

// Login
export const login = async (req, res) => {
  try {
    const { user, accessToken, refreshToken } = await loginUser(req.body);

    setAuthCookie(res, accessToken, refreshToken);

    res.status(200).json({
      message: "Login successful",
      user,
    });
  } catch (error) {
    console.error("Login error:", error.message);
    res.status(401).json({ error: error.message });
  }
};

// Refresh Token
export const refreshToken = async (req, res) => {
  const token = req.cookies.refreshToken;

  if (!token) return res.status(401).json({ message: "No refresh token" });

  try {
    const payload = jwt.verify(token, process.env.REFRESH_SECRET);

    const newAccessToken = jwt.sign(
      { id: payload.id },
      process.env.JWT_SECRET,
      {
        expiresIn: "15m",
      }
    );

    res.cookie("accessToken", newAccessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
      maxAge: 15 * 60 * 1000,
    });

    res.status(200).json({ message: "Access token refreshed" });
  } catch (err) {
    res.status(403).json({ message: "Invalid refresh token" });
  }
};

// Logout
export const logout = (req, res) => {
  res.clearCookie("accessToken");
  res.clearCookie("refreshToken");
  res.status(200).json({ message: "Logged out" });
};

// Reset Password
export const resetPassword = (req, res) => {
  // Generate a random 6 digit number

  // OTP on mail (try on number)

}