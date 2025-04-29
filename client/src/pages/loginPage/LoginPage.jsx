import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { Button, IconButton, InputAdornment, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import axios from "axios";

import "./styles.css";
import { loginUser } from "../../services/auth";
import { useDispatch } from "react-redux";
import { setSession } from "../../features/session/sessionSlice";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const LoginPage = () => {
  let [errorMessage, setErrorMessage] = useState();
  let [showPassword, setShowPassword] = useState(false);
  const navigateTo = useNavigate();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const { token, user } = await loginUser(data);

      dispatch(setSession({ token, user }));
      navigateTo("/");
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "An unexpected error occurred.";
      setErrorMessage(errorMessage);
    }
  };

  const validationRules = {
    email: {
      required: "Email is required",
    },
    password: {
      required: "Password is required",
    },
  };

  return (
    <>
      <h1 style={{ textAlign: "center" }}>Login</h1>
      <div className="login-container">
        <form
          onSubmit={handleSubmit(onSubmit)}
          style={{ display: "flex", flexDirection: "column", gap: "20px" }}
        >
          <TextField
            name="email"
            label="Email"
            variant="outlined"
            {...register("email", validationRules.email)}
            error={!!errors.email}
            helperText={errors.email?.message}
          />
          <TextField
            name="password"
            label="Password"
            variant="outlined"
            type={showPassword ? "text" : "password"}
            {...register("password", validationRules.password)}
            error={!!errors.password}
            helperText={errors.password?.message}
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword((prev) => !prev)}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              },
            }}
          />
          <span>{errorMessage}</span>
          <div style={{ textAlign: "center" }}>
            <Button type="submit" variant="outlined" color="success">
              Login
            </Button>
          </div>
        </form>
        <Link to="/signup" className="text-center pt-3 ">
          Sign Up ?
        </Link>
      </div>
    </>
  );
};

export default LoginPage;
