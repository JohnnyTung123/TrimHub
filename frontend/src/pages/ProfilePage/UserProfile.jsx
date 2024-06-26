import React, { useState } from "react";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8080";

// function to show pop-up window for user to change user information
const UserProfile = ({ user }) => {
  const [showModal, setShowModal] = useState(false);

  const handleChangeInfoClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className="p-8 bg-gray-200 min-h-screen h-full">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-4 flex items-center">
          <span className="w-2 h-6 bg-green-700 mr-2"></span>
          User Information
        </h2>
        {/* showing user name */}
        <div className="mb-4">
          <label htmlFor="username" className="block mb-1 font-bold">
            User Name
          </label>
          <input
            id="username"
            type="text"
            value={user.username}
            readOnly
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        {/* showing user email */}
        <div>
          <label htmlFor="email" className="block mb-1 font-bold">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={user.email}
            readOnly
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
      </div>
      <div className="flex">
        <button
          className="px-4 py-2 mr-4 bg-green-700 text-white rounded hover:opacity-80 cursor-pointer"
          onClick={handleChangeInfoClick}
        >
          Change Information
        </button>
      </div>

      {showModal && (
        <ChangeUserInfoModal user={user} onClose={handleCloseModal} />
      )}
    </div>
  );
};

// function of a pop-up window for user to change user information
const ChangeUserInfoModal = ({ user, onClose }) => {
  const [newUsername, setNewUsername] = useState(user.username);
  const [newEmail, setNewEmail] = useState(user.email);
  const [newPassword, setNewPassword] = useState("");
  const [oldPassword, setOldPassword] = useState("");

  const handleDiscardClick = () => {
    onClose();
  };

  const handleConfirmClick = async () => {
    try {
      const response = await fetch(`${API_URL}/user/${user._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: user._id,
          email: newEmail,
          username: newUsername,
          password: newPassword,
        }),
      });

      if (!response.ok) {
        throw new Error("Error updating user information");
      }

      // Optionally, you can update the user context with the new information
      // const updatedUser = await response.json();
      // updateUser(updatedUser);

      alert("User information updated successfully");
      onClose();
    } catch (error) {
      console.error(error);
      alert("Error updating user information");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-8 rounded shadow-lg bg-gray-200">
        <h2 className="text-2xl font-bold mb-4 flex items-center">
          <span className="w-2 h-6 bg-green-700 mr-2"></span>
          Change User Information
        </h2>
        <div className="mb-4">
          <label htmlFor="newUsername" className="block mb-1 font-bold">
            New User Name
          </label>
          <input
            id="newUsername"
            type="text"
            value={newUsername}
            onChange={(e) => setNewUsername(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="newEmail" className="block mb-1 font-bold">
            New Email
          </label>
          <input
            id="newEmail"
            type="email"
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="newPassword" className="block mb-1 font-bold">
            New Password
          </label>
          <input
            id="newPassword"
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-6">
          <label htmlFor="oldPassword" className="block mb-1 font-bold">
            Old Password for Confirmation
          </label>
          <input
            id="oldPassword"
            type="password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="flex justify-end">
          <button
            className="px-4 py-2 mr-2 bg-gray-200 text-black rounded hover:opacity-80 cursor-pointer"
            onClick={handleDiscardClick}
          >
            Discard change
          </button>
          <button
            className="px-4 py-2 bg-green-700 text-white rounded hover:opacity-80 cursor-pointer"
            onClick={handleConfirmClick}
          >
            Confirm change
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
