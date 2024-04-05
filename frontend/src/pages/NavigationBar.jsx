import React, { useState, useEffect, useMemo } from "react";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";
import './NavigationBar.css';

const NavigationBar = () => {
  const cookies = useMemo(() => new Cookies(), []);
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const [usertype, setUsertype] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // authenticate user
  useEffect(() => {
    console.log("Authenticate user");
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
        setUsertype(data.user.usertype);
      })
      .catch((err) => {
        console.error(err)
        setUser(null);
        setUsertype(null);
      });
  }, [cookies]);

  const handleLogout = () => {
    cookies.remove("auth");
    setUser(null);
    navigate("/");
    navigate(0);
  };

  return (
    <div>
      <header className="navigation-header">
      <h1 onClick={() => navigate("/")}>Trim Hub</h1>
      {user ? (
        <nav className="navigation">
          <a href="/men">Men</a>
          <a href="/women">Woman</a>
          <div className="dropdown">
            <button className="dropbtn" onClick={() => setDropdownOpen(!dropdownOpen)}>
              <span className="username">{user.username}</span>
              <span className="icons"> ▽</span>
            </button>
            {dropdownOpen && (
              <div className="dropdown-content">
                <div className="user-info">
                  <div className="avatar">{/* User Avatar Image */}</div>
                  <div className="username">{user.username}</div>
                </div>
                {usertype === "admin" ? (
                  <div>
                    <a href="/profile">User information</a>
                    <a href="/admin">User management</a>
                  </div>
                ) : (
                  <div>
                    <a href="/profile">User information</a>
                    <a href="/bookings">Bookings</a>
                    <a href="/messages">Messages</a>
                    <a href="/savedsalon">Saved salons</a>
                    <a href="/savedhaircut">Saved haircut</a>
                  </div>
                )}
                <a onClick={handleLogout}>Logout</a>
              </div>
            )}
          </div>
        </nav>
      ) : (
        <nav className="navigation">
          <a href="/men">Men</a>
          <a href="/women">Woman</a>
          <button onClick={() => navigate("/signup")}>Sign Up</button>
          <button onClick={() => navigate("/login")}>Login</button>
        </nav>
      )}
      </header>
    </div>
  );
};

export default NavigationBar;
