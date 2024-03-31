import React, { useState, useEffect, useMemo } from "react";
import Cookies from "universal-cookie";
import "./ProfilePage.css";
import { useNavigate } from "react-router-dom";

import UserProfile from "./UserProfile";
import SalonProfile from "./SalonProfile";

const ProfilePage = () => {
  const cookies = useMemo(() => new Cookies(), []);
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const [userType, setUserType] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // authenticate user
  useEffect(() => {
    console.log("useEffect triggered");
    fetch("http://localhost:8080/auth/endpoint", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${cookies.get("auth")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setUser(data.user);
        setUserType(data.user.usertype);
      })
      .catch((err) => console.error(err));
  }, [cookies]);

  const handleLogout = () => {
    cookies.remove("auth");
    setUser(null);
  };

  // Placeholder functions for handling button clicks
  const handleChangePassword = () => {
    // Logic to change password
  };

  return (
    <div className="profile-page">
      <header className="profile-header">
        <h1>Trim Hub</h1>
        <nav>
          <a href="/men">Men</a> | <a href="/women">Woman</a>
          <div className="dropdown">
            <button
              className="dropbtn"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              {user.username}
              <span className="icons"> ▽</span>
            </button>
            {dropdownOpen && (
              <div className="dropdown-content">
                <div className="user-info">
                  <div className="avatar">{/* User Avatar Image */}</div>
                  <div className="username">{user.username}</div>
                </div>
                <a href="/profile">User information</a>
                <a href="/bookings">Bookings</a>
                <a href="/messages">Messages</a>
                <a href="/savedsalon">Saved salons</a>
                <a href="/savedhaircut">Saved haircut</a>
              </div>
            )}
          </div>
        </nav>
      </header>
      {userType === "customer" ? (
        <UserProfile user={user} />
      ) : userType === "salon" ? (
        <SalonProfile user={user} />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default ProfilePage;
