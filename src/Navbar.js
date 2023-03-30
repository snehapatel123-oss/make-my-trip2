import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import {
  AppBar,
  Toolbar,
  Button,
  IconButton,
  Menu,
  MenuItem
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import FlightIcon from "@mui/icons-material/Flight";
import HotelIcon from "@mui/icons-material/Hotel";
import TrainIcon from "@mui/icons-material/Train";

function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (userName) => {
      if (userName) {
        setIsLoggedIn(true);
      }
    });
  }, []);

  function handleLogout() {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        alert("Log out successful");
      })
      .catch((error) => {
        // An error occurred
        console.log(error);
      });
  }

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="static">
      <Toolbar sx={{ flexGrow: 1 }}>
        <IconButton
          edge="start"
          sx={{ marginRight: 2 }}
          color="inherit"
          aria-label="menu"
          onClick={handleClick}
        >
          <MenuIcon />
        </IconButton>
        <Link
          to="/"
          style={{ textDecoration: "none", color: "inherit", marginRight: 2 }}
        >
          <img
            className="mmt-logo"
            src="https://imgak.mmtcdn.com/pwa_v3/pwa_hotel_assets/header/mmtLogoWhite.png"
            alt="mmtLogo"
          />
        </Link>
        <div style={{ flexGrow: 1 }} />
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem component={Link} to="/flights" onClick={handleClose}>
            <FlightIcon sx={{ marginRight: 1 }} /> Flights
          </MenuItem>
          <MenuItem component={Link} to="/hotels" onClick={handleClose}>
            <HotelIcon sx={{ marginRight: 1 }} /> Hotels
          </MenuItem>
          <MenuItem component={Link} to="/trains" onClick={handleClose}>
            <TrainIcon sx={{ marginRight: 1 }} /> Trains
          </MenuItem>
        </Menu>
        {isLoggedIn ? (
          <Button
            variant="contained"
            color="secondary"
            sx={{ marginLeft: 2 }}
            onClick={handleLogout}
          >
            Logout
          </Button>
        ) : (
          <Button
            variant="contained"
            color="secondary"
            sx={{ marginLeft: 2 }}
            component={Link}
            to="/login"
          >
            Login
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
