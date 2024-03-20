import React, { useState } from "react";
import "./SignUpPage.css";
import { useNavigate } from "react-router-dom";

const SignUpPage = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [usertype, setUsertype] = useState("customer");
  const [error, setError] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Validate input
    let emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email");
      return;
    }
    if (username === "") {
      setError("Please enter a username");
      return;
    }
    if (password.length < 6) {
      setError("Password must be 6+ characters");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    // Send OTP
    const otpResponse = await fetch("http://localhost:8080/auth/otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, username }),
    }).then((res) => res.json());

    if (!otpResponse.success) {
      setError(otpResponse.error);
      return;
    } else {
      alert("OTP sent successfully");
    }
    setOtpSent(true);
  };

  const handleSignUp = async () => {
    const signupResponse = await fetch("http://localhost:8080/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, username, password, usertype, otp }),
    }).then((res) => res.json());

    if (!signupResponse.success) {
      setError(signupResponse.error);
      return;
    }
    alert("Sign up successful");
    navigate("/login");
  };

  return (
    <div>
      <h1>Sign Up Page</h1>
      {otpSent ? (
        <div>
          <p>Enter the OTP sent to your email:</p>
          <input
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
          <button onClick={handleSignUp}>Verify OTP</button>
        </div>
      ) : (
        <div>
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
              <label>Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div>
              <label>Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="6+ characters"
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
                value={usertype}
                onChange={(e) => setUsertype(e.target.value)}
              >
                <option value="customer">Customer</option>
                <option value="doctor">Doctor</option>
              </select>
            </div>
            <button type="submit">Sign Up</button>
          </form>
        </div>
      )}
      {error && <p style={{ color: "red" }}>{error}</p>}
      <div>
        <p>Already have an account?</p>
        <button onClick={() => navigate("/login")}>Login</button>
      </div>
    </div>
  );
};

export default SignUpPage;
