import React, { useState } from "react";
import Navbar from "./components/Navbar/navbar";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/home";
import Cart from "./pages/Cart/cart";
import PlaceOrder from "./pages/placeOrder/placeOrder";
import Footer from "./components/Footer/footer";
import LoginPopup from "./components/LoginPopup/loginPopup";
import OtpPage from "./components/otpPage/otpPage";
import Order from "./pages/order/order";
import Signup from "./components/signup/signup";
import ProtectedRoute from "./components/ProtectedRoute/protectedRoute";
import Profile from "./pages/profile/profile";
const App = () => {
  const [showLogin, setShowLogin] = useState("Sign up");
  return (
    <>
      <div className="app">
        <Navbar setShowLogin={setShowLogin} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginPopup />} />
          {/* <Route path="/signup" element={<Signup />} /> */}

          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route path="/otp" element={<OtpPage />} />
          <Route
            path="/showOrder"
            element={
              <ProtectedRoute>
                <Order />
              </ProtectedRoute>
            }
          />
          <Route
            path="/cart"
            element={
              <ProtectedRoute>
                <Cart />
              </ProtectedRoute>
            }
          />
          <Route
            path="/Order"
            element={
              <ProtectedRoute>
                <PlaceOrder />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
      <Footer />
    </>
  );
};

export default App;

//the pages open the the given path
