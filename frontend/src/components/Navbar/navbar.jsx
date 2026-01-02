import React, { useContext, useState } from "react";
import "./navbar.css";
import { assets } from "../../assets/assets";
import { Link, useNavigate } from "react-router-dom";
import { SomeContext } from "../../context/store";
const Navbar = () => {
  const { getTotalAmount } = useContext(SomeContext);
  const [open, setOpen] = useState(false);
  const [menu, setMenu] = useState("home"); // to track which menu is active
  const navigate = useNavigate();

  const logOut = () => {
    localStorage.removeItem("token");
    navigate("/");
  };
  const order = () => {
    
    navigate("/showOrder");
  };
  const profile = () => {
    navigate("/profile");
  };

  return (
    <div className="navbar">
      <Link to="/">
        <img src={assets.logo} alt="logo" className="logo" />
      </Link>
      <div className={open ? "nav-links open" : "nav-links"}>
      <ul className="menu">
        <li><a
          href="/"
          onClick={() => setMenu("home")}
          className={menu === "home" ? "active" : ""}
        >
          Home
        </a></li>
       <li><a
          href="#explore-menu"
          onClick={() => setMenu("menu")}
          className={menu === "menu" ? "active" : ""}
        >
          menu
        </a></li>
        <li><a
          href="#app-download"
          onClick={() => setMenu("mobile-app")}
          className={menu === "mobile-app" ? "active" : ""}
        >
          mobile-app
        </a></li>
        <li><a
          href="#footer"
          onClick={() => setMenu("contact-us")}
          className={menu === "contact-us" ? "active" : ""}
        >
          contact us
        </a></li>
      </ul>
       <div className="navbar-right">
        <img src={assets.search_icon} alt="" />
        <div className="navbar-search-icon">
          <Link to="/cart">
            <img src={assets.basket_icon} alt="" />
          </Link>
          {getTotalAmount() ? <div className="dot"></div> : null}
        </div>
        {!localStorage.getItem("token") ? (
          <button onClick={() => navigate("/login")}>sign in</button>
        ) : (
          <div className="navbar-profile">
            <img src={assets.profile_icon} />
            <ul className="nav-profile-dropdown">
              <li onClick={profile}>
                <img src={assets.bag_icon} alt="" />
                Profile
              </li>
              <hr />
              <li onClick={()=>{setOpen(!open);}}>
                <img src={assets.bag_icon} alt="" />
                Orders
              </li>
              <hr />
              <li onClick={logOut}>
                <img src={assets.bag_icon} alt="" />
                Logout
              </li>
            </ul>
          </div>
        )}
      </div>
      </div>
       {/* Hamburger */}
      <div className="hamburger" onClick={() => setOpen(!open)}>
        <span></span>
        <span></span>
        <span></span>
      </div>
     
    </div>
  );
};

export default Navbar;
// onclick change the active menu and set the class accordingly then classname active add with the active menu named li
