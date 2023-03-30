import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./styles.css";
import PaymentForm from "./CardDetails";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const CheckoutPage = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const price = searchParams.get("price");
  const navigate = useNavigate();

  // Redirect to Login page if user is not logged in
  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (userName) => {
      if (userName) {
        setLoggedIn(true);
        setUserData(userName);
      } else {
        navigate("/login");
      }
    });
  }, []);

  return (
    <div className="checkout-page">
      <h1>Checkout</h1>
      <div className="checkout-page2">
        <div className="fare-summary">
          <h2>Fare Summary</h2>
          <p>Base Fare: {price}</p>
          <p>Fee and Surcharges: 0.00</p>
          <p>Total Amount: Rs.{price}</p>
        </div>
        <div className="payment-section">
          <h2>Payment Methods</h2>
          <PaymentForm />
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
