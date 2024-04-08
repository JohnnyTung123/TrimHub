import React, { useState } from "react";
import NavigationBar from "../NavigationBar";

const ChangePasswordPage = () => {
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmNewPassword, setConfirmNewPassword] = useState("");
    const [newEmail, setNewEmail] = useState("");
    const [newUsername, setNewUsername] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
  
    const handleSubmit = (e) => {
      e.preventDefault();
  
      // Validate the old password
      if (oldPassword !== "correctpassword") {
        setErrorMessage("Incorrect old password. Please try again.");
        return;
      }
  
      // Validate the new password
      if (newPassword !== confirmNewPassword) {
        setErrorMessage("New passwords do not match. Please try again.");
        return;
      }
  
      // Perform the account update logic here
      // ...
  
      // Clear the form
      setOldPassword("");
      setNewPassword("");
      setConfirmNewPassword("");
      setNewEmail("");
      setNewUsername("");
      setErrorMessage("");
    };
  
    const handleDiscardChanges = () => {
      // Clear the form and navigate back to the profile page
      setOldPassword("");
      setNewPassword("");
      setConfirmNewPassword("");
      setNewEmail("");
      setNewUsername("");
      setErrorMessage("");
      // Add logic to navigate back to the profile page
    };
  
    return (
        <div><NavigationBar/>
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Change User Information</h1>
        {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="oldPassword" className="mr-2">
              Old Password:
            </label>
            <input
              type="password"
              id="oldPassword"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              className="border border-gray-400 px-2 py-1"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="newUsername" className="mr-2">
              New Username:
            </label>
            <input
              type="text"
              id="newUsername"
              value={newUsername}
              onChange={(e) => setNewUsername(e.target.value)}
              className="border border-gray-400 px-2 py-1"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="newPassword" className="mr-2">
              New Password:
            </label>
            <input
              type="password"
              id="newPassword"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="border border-gray-400 px-2 py-1"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="confirmNewPassword" className="mr-2">
              Confirm New Password:
            </label>
            <input
              type="password"
              id="confirmNewPassword"
              value={confirmNewPassword}
              onChange={(e) => setConfirmNewPassword(e.target.value)}
              className="border border-gray-400 px-2 py-1"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="newEmail" className="mr-2">
              New Email:
            </label>
            <input
              type="email"
              id="newEmail"
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
              className="border border-gray-400 px-2 py-1"
            />
          </div>
          <div className="flex">
            <button
              type="button"
              className="bg-red-500 text-white px-4 py-2 rounded"
              onClick={handleDiscardChanges}
            >
              Discard Changes
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Confirm Change 
            </button>
          </div>
        </form>
      </div>
      </div>
    );
  };

export default ChangePasswordPage;