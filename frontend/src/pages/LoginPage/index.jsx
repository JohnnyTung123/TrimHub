import React, { useMemo, useState } from "react";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const cookies = useMemo(() => new Cookies(), []);

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
          navigate(0);
        }
      });
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-8 rounded shadow-lg bg-gray-200">
        <h2 className="text-2xl font-bold mb-4 flex items-center">
          <span className="w-2 h-6 bg-green-700 mr-2"></span>
          Login Page
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-2">
            <label htmlFor="username" className="font-bold">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoComplete="on"
              className="m-2 p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="mb-2">
            <label htmlFor="password" className="font-bold">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="on"
              className="m-2 p-2 border border-gray-300 rounded"
            />
            <button type="button" className="bg-gray-200" onClick={() => navigate("/forgot-password")}>
              Forgot Password?
            </button>
          </div>
          <button type="submit" className="bg-green-700 text-white">Login</button>
          <button type="button" className="bg-gray-200" onClick={() => navigate("/")}>Back</button>
        </form>
        {error && <span className="text-red-600">{error}</span>}
        <div className="mt-2">
          <span className="font-bold mr-2">Don't have an account?</span>
          <button type="button" className="bg-gray-200" onClick={() => navigate("/signup")}>Sign Up</button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
