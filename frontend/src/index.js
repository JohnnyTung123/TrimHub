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
import HaircutDetailsPage from "./pages/HaircutDetailsPage";
import BookingConfirmationPage from "./pages/BookingConfirmationPage";
import BookingPage from "./pages/BookingPage";
import MessagePage from "./pages/MessagePage";
import AdminPage from "./pages/AdminPage";
import Booking2Page from "./pages/Booking2Page";
import HaircutSearchPage from "./pages/HaircutSearchPage";
import ChangePasswordPage from "./pages/ChangePasswordPage";
import NoPage from "./pages/NoPage";

import HomeLayout from "./layouts/HomeLayout";

import { UserProvider } from "./context/UserContext";

export default function App() {
  return (
    <BrowserRouter>
      <UserProvider>
        <Routes>
          <Route element={<HomeLayout />}>
            <Route index element={<HomePage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/salon" element={<SalonPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/bookings" element={<BookingPage />} />
            <Route path="/messages" element={<MessagePage />} />
            <Route path="/savedsalon" element={<SavedSalonPage />} />
            <Route path="/savedhaircut" element={<SavedHaircutPage />} />
            <Route path="/search" element={<SearchSalonPage />} />
            <Route path="/salon/:salonId" element={<SalonDetailsPage />} />
            <Route path="/haircut/:salonId" element={<HaircutDetailsPage />} />
            <Route path="/bookingconfirmation/:planId" element={<BookingConfirmationPage />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="*" element={<NoPage />} />
          </Route>
        </Routes>
      </UserProvider>
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
