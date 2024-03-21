import React, { useState, useEffect, useMemo } from "react";
import Cookies from "universal-cookie";
import "./Homepage.css";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const cookies = useMemo(() => new Cookies(), []);
  const navigate = useNavigate();
  const [user, setUser] = useState({});

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
      })
      .catch((err) => console.error(err));
  }, [cookies]);

  const handleLogout = () => {
    cookies.remove("auth");
    setUser(null);
  };

  return (
    <div>
      <h1>Homepage</h1>
      {user ? (
        <>
          <button onClick={handleLogout}>Logout</button>
          <div>
            <h2>User Information</h2>
            <p>Username: {user.username}</p>
            <p>Email: {user.email}</p>
            <p>User Type: {user.usertype}</p>
          </div>
        </>
      ) : (
        <>
          <button onClick={() => navigate("/signup")}>Sign Up</button>
          <button onClick={() => navigate("/login")}>Login</button>
        </>
      )}
    </div>
  );
};

export default HomePage;
