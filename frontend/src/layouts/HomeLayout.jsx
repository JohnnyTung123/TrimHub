import { Outlet } from "react-router-dom"
import NavBar from "../components/NavBar";

const HomeLayout = () => {
  return (
    <>
      <header>
        <NavBar />
      </header>
      <main>
        <Outlet />
      </main>
    </>
  )
};

export default HomeLayout;
