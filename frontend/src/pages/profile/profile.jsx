import React, { useContext } from "react";
import "./profile.css";
import { SomeContext } from "../../context/store";

import { useNavigate } from "react-router-dom";
const Profile = () => {
  const { profileData,fetchProfile } = useContext(SomeContext);
   console.log("okkkks",profileData);
  const navigate = useNavigate();
  return (
    <div className="profile-container">
      <div className="profile-card">
        <div className="profile-left">
          <div className="avatar">{profileData.name.charAt(0).toUpperCase()}</div>

          <div className="info">
            <h2 >{profileData.name}</h2>
            <p>{profileData.email}</p>

            {profileData.isVerified && <span className="verified">✔ Verified</span>}
          </div>
        </div>

        <div className="profile-actions">
          <button className="btn cart-btn" >
             <span onClick={() => navigate("/cart")}>Cart</span>
          </button>

          <button onClick={() => navigate("/showOrder")}className="btn orders-btn" >
            Orders 
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
