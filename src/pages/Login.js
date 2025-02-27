import React, { useState } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Paper,
  Box,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // 🔹 Handle Login
  const handleLogin = () => {
    const storedUsers = JSON.parse(localStorage.getItem("registeredUsers")) || [];

    // 🔍 Find user by email & password
    const user = storedUsers.find((user) => user.email === email && user.password === password);

    if (user) {
      localStorage.setItem("loggedInUser", JSON.stringify(user)); // Store logged-in user
      alert("Login successful!");
      navigate("/dashboard");
    } else {
      alert("Invalid email or password. Please try again.");
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper elevation={3} sx={{ p: 3, mt: 5 }}>
        <Typography variant="h5" align="center">
          Login
        </Typography>
        <Box sx={{ mt: 3 }}>
          <TextField
            fullWidth
            label="Email"
            variant="outlined"
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            fullWidth
            label="Password"
            type="password"
            variant="outlined"
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
            onClick={handleLogin}
          >
            Login
          </Button>
        </Box>
        <Typography align="center" sx={{ mt: 2 }}>
          Don't have an account?{" "}
          <Button onClick={() => navigate("/register")}>Register</Button>
        </Typography>
      </Paper>
    </Container>
  );
};

export default Login;
