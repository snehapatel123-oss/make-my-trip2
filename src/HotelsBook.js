import "./styles.css";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Box, Button, Typography } from "@mui/material";

function AddingHotels() {
  const [city, setCity] = useState("");
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  const [hotels, setHotels] = useState([]);
  const [filteredTickets, setFilteredTickets] = useState([]);

  const handleSearch = () => {
    const filtered = hotels.filter(
      (hotel) => hotel.city.toLowerCase() === city.toLowerCase()
    );
    setFilteredTickets(filtered);
  };

  useEffect(() => {
    const fetchHotels = async () => {
      const response = await axios.get(
        "https://content.newtonschool.co/v1/pr/63b85bcf735f93791e09caf4/hotels"
      );
      setHotels(response.data);
      setFilteredTickets(response.data);
    };
    fetchHotels();
  }, []);

  return (
    <div className="search-bg">
      <div>
        <h2>Hotels</h2>
        <div
          className="flight-search-container"
          style={{
            position: "relative",
            border: "1px solid white",
            borderTopLeftRadius: "50px",
            borderBottomRightRadius:"50px",
            padding: "8px",
            backgroundColor: "rgba(122, 66, 255, 0.2)"
          }}
        >
          <form>
            <div className="flight-search">
              <label>
                City:
                <input
                  type="text"
                  placeholder="Mumbai"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
              </label>
            </div>
            <div className="flight-search2">
              <label>
                Check-in date:
                <input
                  type="date"
                  value={checkInDate}
                  onChange={(e) => setCheckInDate(e.target.value)}
                />
              </label>
              <label>
                Check-out date:
                <input
                  type="date"
                  value={checkOutDate}
                  onChange={(e) => setCheckOutDate(e.target.value)}
                />
              </label>
            </div>
            <button
              onClick={handleSearch}
              type="button"
              className="flight-search-submit"
              style={{ position: "absolute", bottom: "-15px" }}
            >
              Search
            </button>
          </form>
        </div>
        <div>
          <Box sx={{ p: 3 }}>
            <Typography variant="h4" gutterBottom>
              Available Hotels
            </Typography>
            {filteredTickets.map((hotel) => (
              <Box
                key={hotel.id}
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  border: "1px solid",
                  borderColor: "grey.300",
                  borderRadius: 1,
                  p: 2,
                  my: 2,
                  bgcolor: "rgba(237, 231, 241, 0.7)"
                }}
              >
                <Box sx={{ flexBasis: "33.33%" }}>
                  <Typography variant="subtitle1" gutterBottom>
                    Hotel:
                  </Typography>
                  <Typography variant="h6" gutterBottom>
                    {hotel.hotel_name}
                  </Typography>
                  <Typography variant="subtitle1" gutterBottom>
                    City:
                  </Typography>
                  <Typography variant="h6" gutterBottom>
                    {hotel.city}
                  </Typography>
                  <Typography variant="subtitle1" gutterBottom>
                    Ratings:
                  </Typography>
                  <Typography variant="h6" gutterBottom>
                    {hotel.rating}
                  </Typography>
                </Box>

                <Box sx={{ flexBasis: "33.33%" }}>
                  <Typography variant="subtitle1" gutterBottom>
                    Check-In:
                  </Typography>
                  <Typography variant="h6" gutterBottom>
                    {hotel.check_in}
                  </Typography>
                  <Typography variant="subtitle1" gutterBottom>
                    Check-Out:
                  </Typography>
                  <Typography variant="h6" gutterBottom>
                    {hotel.check_out}
                  </Typography>
                </Box>

                <Box sx={{ flexBasis: "33.33%" }}>
                  <Typography variant="subtitle1" gutterBottom>
                    Price:
                  </Typography>
                  <Typography variant="h6" gutterBottom>
                    {hotel.price_per_night}
                  </Typography>
                  <Typography variant="subtitle1" gutterBottom>
                    Room:
                  </Typography>
                  <Typography variant="h6" gutterBottom>
                    {hotel.room_type}
                  </Typography>
                  <Typography variant="subtitle1" gutterBottom>
                    Guests:
                  </Typography>
                  <Typography variant="h6" gutterBottom>
                    {hotel.guests}
                  </Typography>
                  <Box sx={{ mt: 2 }}>
                    <Button variant="contained" color="primary">
                      <Link
                        to={{
                          pathname: "/checkout",
                          search: `?price=${hotel.price_per_night}`
                        }}
                        className="linkButton"
                        sx={{ textDecoration: "none", color: "inherit" }}
                      >
                        BOOK NOW
                      </Link>
                    </Button>
                  </Box>
                </Box>
              </Box>
            ))}
          </Box>
        </div>
      </div>
      {hotels.length < 1 ? "No Hotels Found!" : null}
    </div>
  );
}

export default AddingHotels;
