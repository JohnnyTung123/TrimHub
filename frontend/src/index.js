import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import SalonPage from "./pages/SalonPage";
import ProfilePage from "./pages/ProfilePage";
import SavedSalonPage from "./pages/SavedSalonPage";
import SavedHaircutPage from "./pages/SavedHaircutPage";
import SearchSalonPage from "./pages/SearchSalonPage/SearchSalonPage";
import SalonDetailsPage from "./pages/SalonDetailsPage";
import BookingPage from "./pages/BookingPage";
import AdminPage from "./pages/AdminPage";
import Booking2Page from "./pages/Booking2Page";
import NoPage from "./pages/NoPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<HomePage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/salon" element={<SalonPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/savedsalon" element={<SavedSalonPage />} />
        <Route path="/savedhaircut" element={<SavedHaircutPage />} />
        <Route path="/search" element={<SearchSalonPage />} />
        <Route path="/salon/:salonId" element={<SalonDetailsPage />} />
        <Route path="/bookings" element={<BookingPage />} />
        <Route path="/booking" element={<Booking2Page />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="*" element={<NoPage />} />
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  <App />
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
