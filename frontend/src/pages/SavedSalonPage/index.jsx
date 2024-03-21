import React, { useState } from 'react';
import './SavedSalonPage.css'; // Make sure to import the CSS file you are going to create

const SavedSalonPage = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const username = 'username';

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
      <header className="savedsalon-header">
        <h1>Trim Hub</h1>
        <nav className="navigation">
          <a href="/men">Men</a>
          <a href="/women">Woman</a>
          <div className="dropdown">
            <button className="dropbtn" onClick={() => setDropdownOpen(!dropdownOpen)}>
              <span className="username">{username}</span>
              <span className="icons"> ▽</span>
            </button>
            {dropdownOpen && (
              <div className="dropdown-content">
                <div className="user-info">
                  <div className="avatar">{/* User Avatar Image */}</div>
                  <div className="username">{username}</div>
                </div>
                <a href="/profile">User information</a>
                <a href="/bookings">Bookings</a>
                <a href="/messages">Messages</a>
                <a href="/savedsalon">Saved salons</a>
                <a href="/savedhaircut">Saved haircut</a>
              </div>
            )}
          </div>
        </nav>
      </header>
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