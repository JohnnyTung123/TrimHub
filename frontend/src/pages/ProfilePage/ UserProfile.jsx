// UserProfile.jsx
import React from "react";

const UserProfile = ({ user }) => {
  return (
    <div className="profile-content">
      <main className="profile-main-content">
        <div className="profile-email-section">
          <label htmlFor="email">Email</label>
          <input id="profile-email" type="email" value={user.email} readOnly />
          <label htmlFor="username">Username</label>
          <input
            id="profile-username"
            type="text"
            value={user.username}
            readOnly
          />
        </div>
      </main>
    </div>
  );
};

export default UserProfile;
