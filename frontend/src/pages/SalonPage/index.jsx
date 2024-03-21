import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "./SalonPage.css";
import NavigationBar from '../NavigationBar';



const SalonPage = () => {
    const navigate = useNavigate();
    const [isFavorite, setIsFavorite] = useState(false);

    const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };


    return (
        <div>
            <NavigationBar />

        <h1>header salon name</h1>
        <img src="image1.jpg" alt="image1" />
        <p>Description.</p>

        <button onClick={toggleFavorite}>
        {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
        </button>
        <button className="booking" onClick={() => navigate("/booking")}>booking</button>
        </div>
        );
};

export default SalonPage;