import React, { useState, useEffect, useMemo } from "react";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";

const NavBar = () => {
  const cookies = useMemo(() => new Cookies(), []);
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const [usertype, setUsertype] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // authenticate user
  useEffect(() => {
    console.log("Authenticate user");
    fetch("http://localhost:8080/auth/endpoint", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${cookies.get("auth")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setUser(data.user);
        setUsertype(data.user.usertype);
      })
      .catch((err) => {
        console.error(err)
        setUser(null);
        setUsertype(null);
      });
  }, [cookies]);

  const handleLogout = () => {
    cookies.remove("auth");
    setUser(null);
    navigate("/");
    navigate(0);
  };

  return (
    <div className="flex justify-between items-center bg-white my-2 mx-4">
      <h1 className="text-4xl cursor-pointer" onClick={() => navigate("/")}>Trim Hub</h1>
      {user ? (
        <nav>
          <a className="mx-4 hover:opacity-80" href="/men">Men</a>
          <a className="mx-4 hover:opacity-80" href="/women">Woman</a>
          <div className="inline-block">
            <button onClick={() => setDropdownOpen(!dropdownOpen)}>
              <span className="font-bold mr-1">{user.username}</span>
              <FontAwesomeIcon icon={faCaretDown} />
            </button>
            {dropdownOpen && (
              <div className="absolute right-0 w-max shadow-md bg-gray-100">
                <div className="bg-gray-300 rounded-full w-20 h-20 mx-auto my-4">{/* User Avatar Image */}</div>
                <div className="font-bold text-xl text-center mb-6">{user.username}</div>
                {usertype === "admin" ? (
                  <div>
                    <a className="block p-3 hover:opacity-80" href="/profile">User information</a>
                    <a className="block p-3 hover:opacity-80" href="/admin">User management</a>
                  </div>
                ) : (
                  <div>
                    <a className="block p-3 hover:opacity-80" href="/profile">User information</a>
                    <a className="block p-3 hover:opacity-80" href="/bookings">Bookings</a>
                    <a className="block p-3 hover:opacity-80" href="/messages">Messages</a>
                    <a className="block p-3 hover:opacity-80" href="/savedsalon">Saved salons</a>
                    <a className="block p-3 hover:opacity-80" href="/savedhaircut">Saved haircut</a>
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
          <button onClick={() => navigate("/signup")}>Sign Up</button>
          <button onClick={() => navigate("/login")}>Login</button>
        </nav>
      )}
    </div>
  );
};

export default NavBar;
