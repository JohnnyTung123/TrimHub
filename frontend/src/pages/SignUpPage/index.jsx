import React, { useState } from "react";
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

  const createSalonInfo = async (userId) => {
    try {
      const response = await fetch("http://localhost:8080/salon-info", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: userId, salonname: username }),
      });

      if (response.error) {
        setError(response.error);
        return;
      }
    } catch (error) {
      console.error(error);
    }
  };

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
    try {
      const response = await fetch("http://localhost:8080/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, username, password, usertype, otp }),
      });

      if (response.error) {
        setError(response.error);
        return;
      }

      const user = await response.json();
      if (user.usertype === "salon") {
        createSalonInfo(user._id);
      }
      alert("Sign up successful");
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-8 rounded shadow-lg bg-gray-200">
        <h2 className="text-2xl font-bold mb-4 flex items-center">
          <span className="w-2 h-6 bg-green-700 mr-2"></span>
          Sign Up Page
        </h2>
        {otpSent ? (
          <div className="mb-2">
            <label htmlFor="otp" className="font-bold">Enter the OTP sent to your email:</label>
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              autoComplete="on"
              className="m-2 p-2 border border-gray-300 rounded"
            />
            <button type="button" className="bg-green-700 text-white" onClick={handleSignUp}>Verify OTP</button>
          </div>
        ) : (
          <div>
            <form onSubmit={handleSubmit}>
              <div className="mb-2">
                <label htmlFor="email" className="font-bold">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="on"
                  className="m-2 p-2 border border-gray-300 rounded"
                />
              </div>
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
                  placeholder="6+ characters"
                  autoComplete="on"
                  className="m-2 p-2 border border-gray-300 rounded"
                />
              </div>
              <div className="mb-2">
                <label htmlFor="confirmPassword" className="font-bold">Confirm Password</label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  autoComplete="on"
                  className="m-2 p-2 border border-gray-300 rounded"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="usertype" className="font-bold mr-2">User Type</label>
                <select
                  value={usertype}
                  onChange={(e) => setUsertype(e.target.value)}
                >
                  <option value="customer">Customer</option>
                  <option value="salon">Salon</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
              <button type="submit" className="bg-green-700 text-white">Sign Up</button>
              <button type="button" className="bg-gray-200" onClick={() => navigate("/")}>
                Back
              </button>
            </form>
          </div>
        )}
        {error && <span className="text-red-600">{error}</span>}
        <div className="mt-2">
          <span className="font-bold mr-2">Already have an account?</span>
          <button type="button" className="bg-gray-200" onClick={() => navigate("/login")}>
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
