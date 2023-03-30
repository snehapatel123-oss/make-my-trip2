import "./styles.css";
import AddingFlights from "./FlightsBook";
import AddingHotels from "./HotelsBook";
import AddingTrains from "./TrainsBook";
import Login from "./Login";
import Register from "./Register";
import CheckoutPage from "./checkoutPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./Navbar";

export default function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<AddingFlights />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/flights" element={<AddingFlights />} />
          <Route path="/hotels" element={<AddingHotels />} />
          <Route path="/trains" element={<AddingTrains />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
