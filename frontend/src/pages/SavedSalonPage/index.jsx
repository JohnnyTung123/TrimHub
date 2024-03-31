import React, { useState } from 'react';
import './SavedSalonPage.css'; // Make sure to import the CSS file you are going to create
import NavigationBar from "../NavigationBar";

const SavedSalonPage = () => {
  const salons = [
    {
      name: "ABC Salons",
      location: "Rm123, Shatin",
      priceRange: "$100-$200",
      rating: 4.5,
      imageUrl: "./img/salon.png" 
    }, 
    {
        name: "ABC Salons",
        location: "Rm123, Shatin",
        priceRange: "$100-$200",
        rating: 4.5,
        imageUrl: "./img/salon.png" 
     }
  ];

  return (
    <div className="savedsalon-page">
      <NavigationBar />

      <main className="savedsalon-main">
        <div className="salon-list">
          {salons.map((salon, index) => (
            <div className="salon-item" key={index}>
              <img src={salon.imageUrl} alt="Salon" className="salon-image" />
              <div className="salon-info">
                <h2 className="salon-name">{salon.name}</h2>
                <p className="salon-location">{salon.location}</p>
                <p className="salon-price">{salon.priceRange}</p>
                <div className="salon-rating">⭐ {salon.rating}</div>
              </div>
              <button className="book-button">Book Now</button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default SavedSalonPage;
