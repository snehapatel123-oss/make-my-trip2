import "./styles.css";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Box, Typography, Button } from "@mui/material";

function AddingTrains() {
  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");
  const [departureDate, setDepartureDate] = useState("");
  const [trains, setTrains] = useState([]);
  const [filteredTickets, setFilteredTickets] = useState([]);

  const handleSearch = () => {
    const filtered = trains.filter(
      (train) =>
        train.from.toLowerCase() === source.toLowerCase() &&
        train.to.toLowerCase() === destination.toLowerCase()
    );
    setFilteredTickets(filtered);
  };

  useEffect(() => {
    const fetchTrains = async () => {
      const response = await axios.get(
        "https://content.newtonschool.co/v1/pr/63b85e152cabb8fdea2673ee/trains"
      );
      setTrains(response.data);
      setFilteredTickets(response.data);
    };
    fetchTrains();
  }, []);

  return (
    <div className="search-bg">
      <div>
        <h2>Trains</h2>
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
                From:
                <input
                  type="text"
                  placeholder="Delhi"
                  className="inputbar"
                  value={source}
                  onChange={(e) => setSource(e.target.value)}
                />
              </label>
              <label>
                To:
                <input
                  type="text"
                  placeholder="Mumbai"
                  className="inputbar"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                />
              </label>
            </div>
            <div className="flight-search2">
              <label>
                Travel Date:
                <input
                  type="date"
                  value={departureDate}
                  onChange={(e) => setDepartureDate(e.target.value)}
                />
              </label>
            </div>
            <button
              onClick={handleSearch}
              className="flight-search-submit"
              style={{ position: "absolute", bottom: "-15px" }}
              type="button"
            >
              Search
            </button>
          </form>
        </div>
      </div>

      <div>
        <Box sx={{ p: 3 }}>
          <Typography variant="h4" gutterBottom>
            Available Trains
          </Typography>
          {filteredTickets.map((train) => (
            <Box
              key={train.train_number}
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
                  FROM:
                </Typography>
                <Typography variant="h6" gutterBottom>
                  {train.from}
                </Typography>
                <Typography variant="subtitle1" gutterBottom>
                  TO:
                </Typography>
                <Typography variant="h6" gutterBottom>
                  {train.to}
                </Typography>
              </Box>

              <Box sx={{ flexBasis: "33.33%" }}>
                <Typography variant="subtitle1" gutterBottom>
                  Departure:
                </Typography>
                <Typography variant="h6" gutterBottom>
                  {`${train.departure.departureTime} | ${train.departure.departureDate}`}
                </Typography>
                <Typography variant="subtitle1" gutterBottom>
                  Train Number:
                </Typography>
                <Typography variant="h6" gutterBottom>
                  {train.train_number}
                </Typography>
              </Box>

              <Box sx={{ flexBasis: "33.33%" }}>
                <Typography variant="subtitle1" gutterBottom>
                  Price:
                </Typography>
                <Typography variant="h6" gutterBottom>
                  {train.price}
                </Typography>
                <Typography variant="subtitle1" gutterBottom>
                  Kilometers:
                </Typography>
                <Typography variant="h6" gutterBottom>
                  {train.kilometers}
                </Typography>
                <Typography variant="subtitle1" gutterBottom>
                  Duration:
                </Typography>
                <Typography variant="h6" gutterBottom>
                  {train.duration}
                </Typography>
                <Box sx={{ mt: 2 }}>
                  <Button variant="contained" color="primary">
                    <Link
                      to={{
                        pathname: "/checkout",
                        search: `?price=${train.price}`
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
      {trains.length < 1 ? "No Trains Found!" : null}
    </div>
  );
}

export default AddingTrains;
