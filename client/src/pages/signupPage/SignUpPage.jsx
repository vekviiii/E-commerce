import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Button, TextField, InputAdornment, IconButton } from "@mui/material";
import { useForm } from "react-hook-form";
import axios from "axios";

// ICONS
import { Visibility, VisibilityOff } from "@mui/icons-material";

import "./styles.css";

const SignUpPage = () => {
  const navigateTo = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
  });

  const onSubmit = async (data) => {
    const response = await axios.post(`/api/register`, data);

    if (response.status === 201) {
      navigateTo(`/`);
    }
  };

  const validationRules = {
    name: { required: "Name is required" },
    email: {
      required: "Email is required",
      pattern: {
        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        message: "Enter a valid email address",
      },
    },
    password: {
      required: "Password is required",
      minLength: {
        value: 8,
        message: "Password must be at least 8 characters",
      },
      pattern: {
        value: /^(?=.*[A-Z])(?=.*[@#$%^&+=!]).*$/,
        message: "Must include an uppercase letter and a special character",
      },
    },
    phone: {
      required: "Phone is required",
      pattern: {
        value: /^[0-9]{10}$/,
        message: "Phone must be 10 digits",
      },
    },
    phoneExtension: {
      required: "Phone extension is required",
      pattern: {
        value: /^[0-9]{1,4}$/,
        message: "Enter a valid extension (1-4 digits)",
      },
    },
  };

  return (
    <>
      <h1 style={{ textAlign: "center", marginBlockStart: "1rem" }}>Sign Up</h1>
      <div className="d-grid">
        <div className="signup-container">
          <form
            onSubmit={handleSubmit(onSubmit)}
            style={{ display: "flex", flexDirection: "column", gap: "20px" }}
          >
            <TextField
              name="name"
              label="Enter name"
              variant="outlined"
              {...register("name", validationRules.name)}
              error={!!errors.name}
              helperText={errors.name?.message}
            />
            <TextField
              name="email"
              label="Enter email"
              variant="outlined"
              {...register("email", validationRules.email)}
              error={!!errors.email}
              helperText={errors.email?.message}
            />
            <TextField
              name="password"
              label="Enter password"
              variant="outlined"
              type={showPassword ? "text" : "password"}
              {...register("password", validationRules.password)}
              error={!!errors.password}
              helperText={errors.password?.message}
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position="end">
                      <div
                        aria-label={
                          showPassword ? "Hide password" : "Show password"
                        }
                        onClick={() => setShowPassword((prev) => !prev)}
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </div>
                    </InputAdornment>
                  ),
                },
              }}
            />
            <TextField
              name="phone"
              label="Enter phone"
              variant="outlined"
              {...register("phone", validationRules.phone)}
              error={!!errors.phone}
              helperText={errors.phone?.message}
            />
            <TextField
              name="phone extension"
              label="Enter phone extension"
              variant="outlined"
              {...register("phoneextension", validationRules.phoneExtension)}
              error={!!errors["phoneextension"]}
              helperText={errors["phoneextension"]?.message}
            />
            <div style={{ textAlign: "center" }}>
              <Button type="submit" variant="outlined" color="success">
                Sign Up
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignUpPage;
