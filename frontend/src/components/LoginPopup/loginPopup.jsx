import React, { useContext, useEffect, useState } from "react";
import "./loginPopup.css";
import { assets } from "../../assets/assets";
import { SomeContext } from "../../context/store";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginPopup = () => {
  const { url} = useContext(SomeContext);//take url fron .env
const navigate=useNavigate();
  const [currentState, setCurrentState] = useState("Login");
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });
  //on any input change it change the data
  const onChangeHandeler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };
  //work after submit button clicked
  const onLogin = async (event) => {
    event.preventDefault();
    let newUrl = url;
    //for sign up
   if(currentState==="Sign Up"){
      newUrl += "/api/user/resister";
      const response = await axios.post(newUrl, data);
    if (response.data.success) {
      //store jwt token in localstorage and navigate to /
      navigate("/otp",{ replace: true,state: { email: data.email,fromSignUp:true } });
    } else {
      alert(response.data.message);
    }
   }
   //for login
    else{
      newUrl += "/api/user/login";
       const response = await axios.post(newUrl, data);
    if (response.data.success) {
      //store jwt token in localstorage and navigate to /
      localStorage.setItem("token", response.data.token);
      navigate("/",{ replace: true });
    } else {
      alert(response.data.message);
    }
    }
   
  };
  useEffect(() => {
    
  }, [data]);
  return (
    
      <form onSubmit={onLogin} className="login-popup-container">
        <div className="login-popup-title">
          <h2>{currentState}</h2>
          <img
            onClick={() =>   navigate("/", { replace: true })}
            src={assets.cross_icon}
            alt="close"
          />
        </div>
        <div className="login-popup-inputs">
          {/* name only when you make a new acc */}
          {currentState === "Login" 
          ? (
            <></>
          ) 
          : (
            <input
              name="name"
              onChange={onChangeHandeler}
              value={data.name}
              type="text"
              placeholder="your name"
              required
            />
          )}
          <input
            name="email"
            onChange={onChangeHandeler}
            value={data.email}
            type="email"
            placeholder="your email address"
            required
          />
          <input
            name="password"
            onChange={onChangeHandeler}
            value={data.password}
            type="password"
            placeholder="your password"
            required
          />
        </div>
        <button type="submit">
          {currentState === "Sign Up" ? "Create account" : "Login"}
        </button>
        <div className="login-popup-condition">
          <input type="checkbox" required />
          <p>By continuing, i agree to the terms of use & privacy policy.</p>
        </div>
        {currentState === "Login" ? (
          <p>
            Create a new account?
            <span onClick={() => setCurrentState("Sign Up")}>Click here</span>
          </p>
        ) : (
          <p>
            Already have an account?{" "}
            <span onClick={() => setCurrentState("Login")}>Login here</span>
          </p>
        )}
      </form>
    
  );
};

export default LoginPopup;
//loginpopup covers the full screen with a semi transparent black background and the form is centered with title cross icon inputs and button and condition with checkbox and toggle between login and signup form
