import React, { useState } from "react";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const cookies = new Cookies();

  const handleSubmit = (e) => {
    e.preventDefault();

    // check if the username is not empty
    if (username === "") {
      setError("Please enter a username");
      return;
    }

    // check if password is not empty
    if (password === "") {
      setError("Please enter a password");
      return;
    }

    // send the login request
    fetch("http://localhost:8080/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          setError(data.error);
        } else {
          console.log("User login successfully", data);
          // Store the JWT token in the browser's cookies
          cookies.set("auth", data.accessToken, { path: "/" });
          // redirect to the home page
          navigate("/");
        }
      });
  };

  return (
    <div>
      <h1>Login Page</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            autoComplete="on"
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="on"
          />
          <button type="button" onClick={() => navigate("/forgot-password")}>
            Forgot Password?
          </button>
        </div>
        <button type="submit">Login</button>
        <button type="button" onClick={() => navigate("/")}>Back</button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <div>
        <p>Don't have an account?</p>
        <button type="button" onClick={() => navigate("/signup")}>Sign Up</button>
      </div>
    </div>
  );
};

export default LoginPage;
