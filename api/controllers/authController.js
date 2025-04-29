import { loginUser, registerUser } from "../services/authService.js";

export const register = async (req, res) => {
  try {
    const newUser = await registerUser(req.body);
    res.status(201).json({
      message: "User registered successfully!",
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
      },
    });
  } catch (error) {
    console.error("Registration error:", error.message);
    res.status(400).json({ error: "Registration failed. Please try again." });
  }
};

export const login = async (req, res, next) => {
  try {
    const result = await loginUser(req.body);

    if (!result) {
      return res.status(404).json("Invalid email or password");
    }

    res.status(200).json({
      message: "Login successful",
      user: {
        name: result.user.name,
        email: result.user.email,
      },
      token: result.token,
    });
  } catch (error) {
    res.status(400).json(`error: ${error.message}`);
  }
};
