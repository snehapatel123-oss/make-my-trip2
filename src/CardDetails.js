import React, { useState } from "react";
import "./styles.css";
import { useLocation } from "react-router-dom";
import {
  TextField,
  Button,
  Box,
  FormControl,
  InputAdornment,
  IconButton
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

function PaymentForm() {
  const [name, setName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [showCVV, setShowCVV] = useState(false);

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const price = searchParams.get("price");

  const handleCardNumberChange = (e) => {
    let input = e.target.value;
    input = input.replace(/\D/g, ""); // Allow only digits
    input = input.slice(0, 16); // Limit to 16 digits
    input = input.replace(/(\d{4})/g, "$1 "); // Add a space after every 4 digits
    setCardNumber(input);
  };

  const handleExpiryDateChange = (e) => {
    let input = e.target.value;
    input = input.replace(/\D/g, ""); // Allow only digits
    input = input.slice(0, 4); // Limit to 4 digits
    input = input.replace(/(\d{2})(\d{0,2})/, "$1/$2"); // Add a slash after the first two digits
    setExpiryDate(input);
  };

  const handleCVVChange = (e) => {
    let input = e.target.value;
    input = input.replace(/\D/g, ""); // Allow only digits
    input = input.slice(0, 3); // Limit to 3 digits
    setCvv(input);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle submission of form data
    alert("Payment successful!");
  };

  return (
    <div className="payment-form">
      <form onSubmit={handleSubmit}>
        <FormControl fullWidth sx={{ my: 1 }}>
          <TextField
            id="name-input"
            type="text"
            placeholder="Name on card"
            value={name}
            onChange={(e) => setName(e.target.value.replace(/[^a-zA-Z ]/g, ""))} // Allow only alphabets and spaces
            required
          />
        </FormControl>
        <FormControl fullWidth sx={{ my: 1 }}>
          <TextField
            id="card-number-input"
            type={"text"}
            placeholder="0000 0000 0000 0000"
            value={cardNumber}
            onChange={handleCardNumberChange}
            required
          />
        </FormControl>
        <FormControl fullWidth sx={{ my: 1 }}>
          <TextField
            id="expiry-date-input"
            type="text"
            placeholder="MM/YY"
            value={expiryDate}
            onChange={handleExpiryDateChange}
            required
          />
        </FormControl>
        <FormControl fullWidth sx={{ my: 1 }}>
          <TextField
            id="cvv-input"
            type={showCVV ? "text" : "password"}
            value={cvv}
            placeholder="CVV"
            onChange={handleCVVChange}
            required
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowCVV(!showCVV)}
                    onMouseDown={(event) => event.preventDefault()}
                  >
                    {showCVV ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              )
            }}
          />
        </FormControl>

        <Box sx={{ mt: 3 }}>
          <Button variant="contained" type="submit">
            Pay Rs.{price} Now
          </Button>
        </Box>
      </form>
    </div>
  );
}
export default PaymentForm;
