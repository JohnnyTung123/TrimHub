import React, { useState, useEffect, useMemo } from "react";
import Cookies from "universal-cookie";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import "./ProfilePage.css";

import UserProfile from "./UserProfile";
import SalonProfile from "./SalonProfile";

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
    <>
      {usertype === "customer" || usertype === "admin" ? (
        <UserProfile user={user} />
      ) : usertype === "salon" ? (
        <SalonProfile user={user} />
      ) : (
        <FontAwesomeIcon icon={faSpinner} className="w-screen fa-4x" />
      )}
    </>
  );
};

export default ProfilePage;
