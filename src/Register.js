import { Button, TextField } from "@mui/material";
import { Box } from "@mui/system";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebasecomfig";
import { useNavigate } from "react-router-dom";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Typography } from "@mui/material";

function Register() {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const userName = data.get("userName");
    const password = data.get("password");

    createUserWithEmailAndPassword(auth, userName, password).then(
      (userDetails) => {
        console.log(userDetails.user);
        alert("Registration successful!");
      }
    );

    setTimeout(() => {
      navigate("/login");
    }, 0);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh"
        //backgroundColor: "#f5f5f5"
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 2,
          p: 4,
          backgroundColor: "rgba(100, 0, 255, 0.3)",
          borderRadius: "16px",
          boxShadow: "0px 3px 6px #00000029"
        }}
      >
        <Box sx={{ mb: 3 }}>
          <LockOutlinedIcon />
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
        </Box>
        <form onSubmit={handleSubmit}>
          <TextField
            type="text"
            name="userName"
            label="Email"
            placeholder="abc@gmail.com"
            variant="outlined"
            size="large"
            required
            fullWidth
            sx={{ mb: 2 }}
          />
          <TextField
            type="password"
            name="password"
            label="Password"
            placeholder="Enter Password"
            variant="outlined"
            size="large"
            required
            fullWidth
            sx={{ mb: 2 }}
          />
          <Button type="submit" variant="contained" size="large">
            Register
          </Button>
        </form>
      </Box>
    </Box>
  );
}

export default Register;
