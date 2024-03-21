import React, { useState } from "react";
import "./ProfilePage.css";

const ProfilePage = () => {
    const username = 'username';
    const email = 'abc@example.com';

    const [dropdownOpen, setDropdownOpen] = useState(false);
  
    // Placeholder functions for handling button clicks
    const handleChangePassword = () => {
      // Logic to change password
    };
  
    const handleLogout = () => {
      // Logic to log out
    };
  
    return (
      <div className="profile-page">
        <header className="profile-header">
        <h1>Trim Hub</h1>
        <nav>
          <a href="/men">Men</a> | <a href="/women">Woman</a>
          <div className="dropdown">
            <button className="dropbtn" onClick={() => setDropdownOpen(!dropdownOpen)}>{username}
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
              </div>
            )}
          </div>
        </nav>
      </header>
        <div className="profile-content">
          <main className="profile-main-content">
            <div className="profile-email-section">
              <label htmlFor="email">Email</label>
              <input id="profile-email" type="email" value={email} readOnly />
            </div>
            <button onClick={handleChangePassword}>Change Password</button>
            <button onClick={handleLogout}>Log out</button>
          </main>
        </div>
      </div>
    );
  }

export default ProfilePage;