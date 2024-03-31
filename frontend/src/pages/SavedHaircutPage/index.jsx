import React, { useState } from 'react';
import './SavedHaircutPage.css'; // Make sure to import the CSS file you are going to create
import NavigationBar from "../NavigationBar";

const SavedHaircutPage = () => {
  const haircuts = [
    {
      name: "ABC Salons",
      location: "Rm123, Shatin",
      style: "Cut + Color",
      price: "$100",
      imageUrl: "./img/haircut.png" 
    }, 
    {
      name: "ABC Salons",
      location: "Rm123, Shatin",
      style: "Cut + Color",
      price: "$100",
      imageUrl: "./img/haircut.png" 
     }
  ];

  return (
    <div className="savedhaircut-page">
      <NavigationBar />

      <main className="savedhaircut-main">
        <div className="haircut-list">
          {haircuts.map((haircut, index) => (
            <div className="haircut-item" key={index}>
              <img src={haircut.imageUrl} alt="Haircut" className="haircut-image" />
              <div className="haircut-info">
                <h2 className="haircut-name">{haircut.name}</h2>
                <p className="haircut-location">{haircut.location}</p>
                <p className="haircut-style">{haircut.style}</p>
                <div className="haircut-price">{haircut.price}</div>
              </div>
              <button className="book-button">Book Now</button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default SavedHaircutPage;
