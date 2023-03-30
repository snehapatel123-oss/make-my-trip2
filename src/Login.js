import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebasecomfig";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Box, Button, Container, TextField, Typography } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { styled } from "@mui/system";

const LoginContainer = styled(Container)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  marginTop: theme.spacing(8),
  backgroundColor: "rgba(100, 0, 255, 0.3)",
  borderRadius: "10px",
  padding: "20px"
}));

const LoginForm = styled("form")(({ theme }) => ({
  marginTop: theme.spacing(1),
  width: "100%"
}));

const LoginButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(3, 0, 2)
}));

const Login = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const userName = data.get("userName");
    const password = data.get("password");
    signInWithEmailAndPassword(auth, userName, password)
      .then((userDetails) => {
        setIsLoggedIn(true);
        navigate("/");
      })
      .catch(() => {
        alert("username or password is invalid");
      });
  };

  return (
    <LoginContainer maxWidth="xs">
      <Box sx={{ mb: 3 }}>
        <LockOutlinedIcon />
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
      </Box>
      <LoginForm onSubmit={handleSubmit}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="userName"
          label="Email Address"
          name="userName"
          autoComplete="email"
          autoFocus
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
        />
        <LoginButton
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Sign In
        </LoginButton>
        <Link to="/register" variant="body2">
          {"Don't have an account? Sign Up"}
        </Link>
      </LoginForm>
    </LoginContainer>
  );
};

export default Login;
