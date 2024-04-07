import React, { useState, useEffect } from "react";

const AdminPage = () => {
  const API_URL = "http://localhost:8080";
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`${API_URL}/user`);
        if (!response.ok) {
          throw Error("Cannot fetch user.");
        }
        const data = await response.json();
        setUsers(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchUser();
  }, []);

  const deleteUser = async (userId) => {
    try {
      const response = await fetch(
        `${API_URL}/user/${userId}`,
        {
          method: "DELETE",
        },
      );
      if (!response.ok) {
        throw Error("Cannot delete user.");
      }
      setUsers((users) => users.filter((user) => user._id !== userId));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-8 bg-gray-200 h-full">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-4 flex items-center">
          <span className="w-2 h-6 bg-green-700 mr-2"></span>
          User Management
        </h2>
        {users.map((user) => (
          <div key={user._id}>
            <label htmlFor="username" className="block mb-1 font-bold">
              User Name
            </label>
            <input
              id="username"
              type="text"
              value={user.username}
              readOnly
              className="w-full mb-1 p-2 border border-gray-300 rounded"
            />
            <div>
              <label htmlFor="email" className="block mb-1 font-bold">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={user.email}
                readOnly
                className="w-full mb-1 p-2 border border-gray-300 rounded"
              />
            </div>
            <div className="flex">
              <button
                className="px-4 py-2 mt-1 mb-4 bg-green-700 text-white rounded hover:opacity-80 cursor-pointer"
                onClick={() => deleteUser(user._id)}
              >
                Delete User
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminPage;
