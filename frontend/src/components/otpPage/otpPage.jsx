import React, { useContext,useState } from "react";
import "./otpPage.css";
import axios from "axios";
import { assets } from "../../assets/assets";
import { SomeContext } from "../../context/store";
import { useLocation,useNavigate,Navigate } from "react-router-dom";

const OtpPage = ({ setShowLogin }) => {
  const navigate=useNavigate();
  const { url } = useContext(SomeContext); //take url fron .env
  const location = useLocation();
  //take email and signup or not from signup page
  const { email,fromSignUp } = location.state || {};
  console.log(email);
 const [data, setData] = useState({
    email: `${email}`,
    otp: "",
  });
   if (!fromSignUp) {
    return <Navigate to="/login" replace />;
  }
  const onLogin = async (event) => {
    event.preventDefault();
    let newUrl = url;
    newUrl += "/api/user/verifyOtp";
    const response = await axios.post(newUrl, data);
    if (response.data.success) {
      //store jwt token in localstorage and navigate to /
      localStorage.setItem("token", response.data.token);
      
      navigate("/", { replace: true });
    } else {
      alert(response.data.message);
    }
  };
//on any input change it change the data
  const onChangeHandeler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };
  return (
    <form onSubmit={onLogin} className="login-popup-container">
      <div className="login-popup-title">
        <h2>Enter OTP</h2>
        <img
          onClick={() =>   navigate("/", { replace: true })}
          src={assets.cross_icon}
          alt="close"
        />
      </div>
      <div className="login-popup-inputs">
        <input name="otp" type="text" placeholder="enter otp"  onChange={onChangeHandeler} required />
      </div>
      <button type="submit">Create account</button>
    </form>
  );
};

export default OtpPage;
//loginpopup covers the full screen with a semi transparent black background and the form is centered with title cross icon inputs and button and condition with checkbox and toggle between login and signup form
