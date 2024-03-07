import React, { useState } from "react";
import "./SignUpPage.css";
import { useNavigate } from "react-router-dom";

const SignUpPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [userType, setUserType] = useState("customer");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // check if the email is valid
    let emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email");
      return;
    }

    // check if password and confirm password match
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
  };

  return (
    <div>
      <h1>Sign Up Page</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <label>Confirm Password</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <div>
          <label>User Type</label>
          <select
            value={userType}
            onChange={(e) => setUserType(e.target.value)}
          >
            <option value="customer">Customer</option>
            <option value="doctor">Doctor</option>
          </select>
        </div>
        <button type="submit">Sign Up</button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <div>
        <p>Already have an account?</p>
        <button onClick={() => navigate("/login")}>Login</button>
      </div>
    </div>
  );
};

export default SignUpPage;
