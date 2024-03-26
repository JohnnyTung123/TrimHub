import React, { useState, useEffect, useMemo } from "react";
import Cookies from "universal-cookie";
import "./Homepage.css";
import { useNavigate } from "react-router-dom";
import NavigationBar from "../NavigationBar";
const backgroundImageUrl = './img/background.png';

const HomePage = () => {
  const cookies = useMemo(() => new Cookies(), []);
  const navigate = useNavigate();
  const [user, setUser] = useState({});

  // authenticate user
  useEffect(() => {
    console.log("useEffect triggered");
    fetch("http://localhost:8080/auth/endpoint", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${cookies.get("auth")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setUser(data.user);
      })
      .catch((err) => console.error(err));
  }, [cookies]);

  const handleLogout = () => {
    cookies.remove("auth");
    setUser(null);
  };

  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = () => {
    // Perform search logic with the searchQuery
    console.log(`Searching for: ${searchQuery}`);
  };

  const handleChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const [photos, setPhotos] = useState([
    { id: 1, url: './img/haircut.png', description: 'Photo 1' },
    { id: 2, url: './img/haircut.png', description: 'Photo 2' },
    { id: 3, url: './img/haircut.png', description: 'Photo 3' },
    { id: 4, url: './img/haircut.png', description: 'Photo 4' },
    { id: 5, url: './img/haircut.png', description: 'Photo 5' },
    { id: 6, url: './img/haircut.png', description: 'Photo 6' },
  ]);


  const handleAddToFavorites = (id) => {
    // Implement your logic to add the photo with the given id to favorites
    console.log(`Added photo with id ${id} to favorites`);
  };

  const handlePhotoClick = (id) => {
    // Implement your logic to redirect to the page corresponding to the photo with the given id
    console.log(`Clicked on photo with id ${id}`);
  };

  const firstPartPhotos = photos.slice(0, 3);
  const secondPartPhotos = photos.slice(3);

  return (
    <div>
      <NavigationBar/>
      <div className="container">
      <div className="background" style={{ backgroundImage: `url(${backgroundImageUrl})` }}>
        <div className="content">
          <h1 className="text">Open a new character of your life </h1>
          <div className="search-bar">
            <input type="text" value={searchQuery} onChange={handleChange} placeholder="What haircut or salon you want today?" />
            <button onClick={handleSearch}>Search</button>
          </div>
        </div>
      </div>
    </div>

    <div className="main-container">
      <div className="content-container">
        <div className="content-section">
          <h2>Hot</h2>
          <div className="photo-group">
            {firstPartPhotos.map((photo) => (
              <div key={photo.id} className="photo">
                <img src={photo.url} alt={photo.description} onClick={() => handlePhotoClick(photo.id)} />
                <p>{photo.description}</p>
                <button onClick={() => handleAddToFavorites(photo.id)}>Add to Favorites</button>
              </div>
            ))}
          </div>
        </div>
        <div className="content-section">
          <h2>New Arrival</h2>
          <div className="photo-group">
            {secondPartPhotos.map((photo) => (
              <div key={photo.id} className="photo">
                <img src={photo.url} alt={photo.description} onClick={() => handlePhotoClick(photo.id)} />
                <p>{photo.description}</p>
                <button onClick={() => handleAddToFavorites(photo.id)}>Add to Favorites</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>




    </div>
  );
};

export default HomePage;