import "./styles.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Box, Button, Typography } from "@mui/material";

function AddingFlights() {
  const [fromCity, setFromCity] = useState("");
  const [toCity, setToCity] = useState("");
  const [departureDate, setDepartureDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [tickets, setTickets] = useState([]);
  const [filteredTickets, setFilteredTickets] = useState([]);

  const handleSearch = () => {
    const filtered = tickets.filter(
      (ticket) =>
        ticket.from.toLowerCase() === fromCity.toLowerCase() &&
        ticket.to.toLowerCase() === toCity.toLowerCase()
    );
    setFilteredTickets(filtered);
  };

  useEffect(() => {
    const fetchTickets = async () => {
      const response = await axios.get(
        "https://content.newtonschool.co/v1/pr/63b85b1209f0a79e89e17e3a/flights"
      );
      setTickets(response.data);
      setFilteredTickets(response.data);
    };
    fetchTickets();
  }, []);

  return (
   
    <div className="search-bg">
      <h2>Flights</h2>
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
                value={fromCity}
                placeholder="Delhi"
                className="inputbar"
                onChange={(e) => setFromCity(e.target.value)}
              />
            </label>
            <label>
              To:
              <input
                type="text"
                value={toCity}
                placeholder="Mumbai"
                className="inputbar"
                onChange={(e) => setToCity(e.target.value)}
              />
            </label>
          </div>
          <div className="flight-search2">
            <label>
              Departure date:
              <input
                type="date"
                value={departureDate}
                onChange={(e) => setDepartureDate(e.target.value)}
              />
            </label>
            <label>
              Return date:
              <input
                type="date"
                value={returnDate}
                onChange={(e) => setReturnDate(e.target.value)}
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
      <div>
        <Box sx={{ p: 3 }}>
          <Typography variant="h4" gutterBottom>
            Available Tickets
          </Typography>
          {filteredTickets.map((ticket) => (
            <Box
              key={ticket.id}
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                border: "1px solid",
                borderColor: "grey.300",
                borderRadius: 2,
                p: 2,
                my: 2,
                bgcolor: "rgba(237, 231, 241, 0.7)",
                
              }}
            >
              <Box sx={{ flexBasis: "33.33%" }}>
                <Typography variant="subtitle1" gutterBottom>
                  FROM:
                </Typography>
                <Typography variant="h6" gutterBottom>
                  {ticket.from}
                </Typography>
                <Typography variant="subtitle1" gutterBottom>
                  TO:
                </Typography>
                <Typography variant="h6" gutterBottom>
                  {ticket.to}
                </Typography>
                <Typography variant="subtitle1" gutterBottom>
                  Airline:
                </Typography>
                <Typography variant="h6" gutterBottom>
                  {ticket.airlineName}
                </Typography>
              </Box>

              <Box sx={{ flexBasis: "33.33%" }}>
                <Typography variant="subtitle1" gutterBottom>
                  Departure:
                </Typography>
                <Typography variant="h6" gutterBottom>
                  {`${ticket.departure.departureTime} | ${ticket.departure.departureDate}`}
                </Typography>
                <Typography variant="subtitle1" gutterBottom>
                  Return:
                </Typography>
                <Typography variant="h6" gutterBottom>
                  {`${ticket.return.returnTime} | ${ticket.return.returnDate}`}
                </Typography>
              </Box>

              <Box sx={{ flexBasis: "33.33%" }}>
                <Typography variant="subtitle1" gutterBottom>
                  Price:
                </Typography>
                <Typography variant="h6" gutterBottom>
                  {ticket.price}
                </Typography>
                <Typography variant="subtitle1" gutterBottom>
                  Via:
                </Typography>
                <Typography variant="h6" gutterBottom>
                  {ticket.via}
                </Typography>
                <Typography variant="subtitle1" gutterBottom>
                  Duration:
                </Typography>
                <Typography variant="h6" gutterBottom>
                  {ticket.duration}
                </Typography>
                <Box sx={{ mt: 2 }}>
                  <Button variant="contained" color="primary">
                    <Link
                      to={{
                        pathname: "/checkout",
                        search: `?price=${ticket.price}`
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
      {tickets.length < 1 ? "No Flights Found!" : null}
    </div>
  );
}

export default AddingFlights;
