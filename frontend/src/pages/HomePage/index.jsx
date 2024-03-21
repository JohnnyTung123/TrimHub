import React, { useState, useEffect } from "react";
import Cookies from "universal-cookie";
import "./Homepage.css";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const cookies = new Cookies();
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
  }, []);

  return (
    <div>
      <h1>Home Page</h1>
      <button onClick={() => navigate("/signup")}>Sign Up</button>
      <button onClick={() => navigate("/login")}>Login</button>
      <h2>User Information</h2>
      {user && (
        <div>
          <p>Username: {user.username}</p>
          <p>Email: {user.email}</p>
          <p>User Type: {user.usertype}</p>
        </div>
      )}
    </div>
  );
};

export default HomePage;
