import React, { useState, useMemo } from "react";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { useUser } from "../context/UserContext";

const NavBar = () => {
  const { user, setUser } = useUser();
  const cookies = useMemo(() => new Cookies(), []);
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // functuin to logout
  const handleLogout = () => {
    cookies.remove("auth");
    setUser(null);
    navigate("/");
  };

  return (
    <div className="flex justify-between items-center bg-white my-2 mx-4">
      <h1 className="text-4xl cursor-pointer" onClick={() => navigate("/")}>Trim Hub</h1>
      {/* showing the nav bar with correspond user type and user information */}
      {user ? (
        <nav>
          <a className="mx-4 hover:opacity-80" href="/men">Men</a>
          <a className="mx-4 hover:opacity-80" href="/women">Woman</a>
          <div className="inline-block">
            <button type="button" className="bg-green-700 text-white" onClick={() => setDropdownOpen(!dropdownOpen)}>
              <span className="font-bold mr-1">{user.username}</span>
              <FontAwesomeIcon icon={faCaretDown} />
            </button>
            {dropdownOpen && (
              <div className="absolute right-0 w-max shadow-md bg-gray-100">
                <div className="bg-gray-300 rounded-full w-20 h-20 mx-auto my-4">{/* User Avatar Image */}</div>
                <div className="font-bold text-xl text-center mb-6">{user.username}</div>
                {user.usertype === "admin" ? (
                  <div>
                    <a className="block p-3 hover:opacity-80" href="/profile">User information</a>
                    <a className="block p-3 hover:opacity-80" href="/admin">User management</a>
                  </div>
                ) : (
                  <div>
                    <a className="block p-3 hover:opacity-80" href="/profile">User information</a>
                    <a className="block p-3 hover:opacity-80" href="/bookings">Bookings</a>
                    <a className="block p-3 hover:opacity-80" href="/messages">Messages</a>
                    <a className="block p-3 hover:opacity-80" href="/savedsalon">Followed salons</a>
                    <a className="block p-3 hover:opacity-80" href="/savedhaircut">Followed haircuts</a>
                  </div>
                )}
                <a className="block p-3 hover:opacity-80 cursor-pointer" onClick={handleLogout}>Logout</a>
              </div>
            )}
          </div>
        </nav>
      ) : (
        <nav>
          <a className="mx-4 hover:opacity-80" href="/men">Men</a>
          <a className="mx-4 hover:opacity-80" href="/women">Woman</a>
          <button type="button" className="bg-gray-200" onClick={() => navigate("/signup")}>Sign Up</button>
          <button type="button" className="bg-green-700 text-white" onClick={() => navigate("/login")}>Login</button>
        </nav>
      )}
    </div>
  );
};

export default NavBar;
