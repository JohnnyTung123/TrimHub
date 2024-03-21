import React, { useState } from 'react';
import './SavedHaircutPage.css'; // Make sure to import the CSS file you are going to create

const SavedHaircutPage = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const username = 'username';

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
      <header className="savedhaircut-header">
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