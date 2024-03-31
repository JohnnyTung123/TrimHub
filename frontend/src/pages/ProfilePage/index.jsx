import React, { useState, useEffect, useMemo } from "react";
import Cookies from "universal-cookie";
import "./ProfilePage.css";

import UserProfile from "./UserProfile";
import SalonProfile from "./SalonProfile";
import NavigationBar from "../NavigationBar";

const ProfilePage = () => {
  const cookies = useMemo(() => new Cookies(), []);
  const [user, setUser] = useState({});
  const [usertype, setUsertype] = useState("");

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

  return (
    <div className="profile-page">
      <NavigationBar />

      {usertype === "customer" ? (
        <UserProfile user={user} />
      ) : usertype === "salon" ? (
        <SalonProfile user={user} />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default ProfilePage;
