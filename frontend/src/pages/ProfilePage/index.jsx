import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

import UserProfile from "./UserProfile";
import SalonProfile from "./SalonProfile";
import { useUser } from "../../context/UserContext";

const ProfilePage = () => {
  const { user } = useUser();

  return (
    <>
      {user?.usertype === "customer" || user?.usertype === "admin" ? (
        <UserProfile user={user} />
      ) : user?.usertype === "salon" ? (
        <SalonProfile user={user} />
      ) : (
        <FontAwesomeIcon icon={faSpinner} className="w-screen fa-4x" />
      )}
    </>
  );
};

export default ProfilePage;
