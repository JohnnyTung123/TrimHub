import React, { useEffect, useMemo } from "react";
import Cookies from "universal-cookie";
import { Outlet } from "react-router-dom";

import NavBar from "../components/NavBar";
import { useUser } from "../context/UserContext";

const HomeLayout = () => {
  const { setUser } = useUser();
  const cookies = useMemo(() => new Cookies(), []);
  const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:8080";

  useEffect(() => {
    const authenticateUser = async () => {
      console.log("Authenticate user");
      try {
        const response = await fetch(`${apiUrl}/auth/endpoint`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${cookies.get("auth")}`,
          },
        });
        const data = await response.json();
        console.log("User authenticate:", data.user);
        setUser(data.user);
      } catch (error) {
        console.error(error);
        setUser(null);
      }
    };
    authenticateUser();
  }, [cookies]);

  return (
    <>
      <header>
        <NavBar />
      </header>
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default HomeLayout;
