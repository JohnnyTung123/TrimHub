import React, { useState, useEffect, useMemo } from "react";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";
import './NavigationBar.css';

const NavigationBar = ( ) => {
  const cookies = useMemo(() => new Cookies(), []);
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const username = 'username';



  const handleLogout = () => {
    cookies.remove("auth");
    setUser(null);
  };

  return (
    <div>
      {user ? (

        <header className="savedsalon-header">
        <h1 onClick={() => navigate("/")}>Trim Hub</h1>
        <nav className="navigation">
          <a href="/men">Men</a>
          <a href="/women">Woman</a>
          <div className="dropdown">
            <button className="dropbtn" onClick={() => setDropdownOpen(!dropdownOpen)}>
              <span className="username">{username}</span>
              <span className="icons"> ▽</span>
            </button>
            {dropdownOpen && (
              <div className="dropdown-content">
                <div className="user-info">
                  <div className="avatar">{/* User Avatar Image */}</div>
                  <div className="username">{username}</div>
                </div>
                <a href="/profile">User information</a>
                <a href="/bookings">Bookings</a>
                <a href="/messages">Messages</a>
                <a href="/savedsalon">Saved salons</a>
                <a href="/savedhaircut">Saved haircut</a>
                <a onClick={handleLogout} >Logout</a>
              </div>
            )}
          </div>
        </nav>
      </header>


      ) : (


        <header className="savedsalon-header">
        <h1 onClick={() => navigate("/")}>Trim Hub</h1>
        <nav className="navigation">
          <a href="/men">Men</a>
          <a href="/women">Woman</a>
          
          <button className="" onClick={() => navigate("/signup")}>Sign Up</button>
          <button className="" onClick={() => navigate("/login")}>Login</button>
          
        </nav>
      </header>


      )}
    </div>
  );
};


export default NavigationBar;