import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import SalonPage from "./pages/SalonPage";
import ProfilePage from "./pages/ProfilePage";
import NoPage from "./pages/NoPage";
import SavedSalonPage from "./pages/SavedSalonPage";
import SavedHaircutPage from "./pages/SavedHaircutPage";
import BookingPage from "./pages/BookingPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="signup" element={<SignUpPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/salon" element={<SalonPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/savedsalon" element={<SavedSalonPage />} />
        <Route path="/savedhaircut" element={<SavedHaircutPage />} />
        <Route path="/booking" element={<BookingPage />} />
        {/* <Route element={<ProtectedRoutes />}>
          <Route path="patient" element={<PatientPage />} />
          <Route path="doctor" element={<DoctorPage />} />
        </Route> */}
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
