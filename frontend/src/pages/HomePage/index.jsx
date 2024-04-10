import React, { useState } from "react";
import "./HomePage.css";

const HomePage = () => {
  const backgroundImage = './img/background.png';

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
    <>
      <div className="flex items-center justify-center h-screen bg-cover bg-center" style={{ backgroundImage: `url(${backgroundImage})` }}>
        <div>
          <h1 className="text-5xl font-bold">Open a new character of your life</h1>
          <div className="flex items-center justify-center m-2">
            <input
              type="text"
              value={searchQuery}
              onChange={handleChange}
              placeholder="What haircut or salon you want today?"
              className="text-xl placeholder:text-sm mr-2 p-2"
            />
            <button className="bg-green-700 text-white" onClick={handleSearch}>Search</button>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center h-screen">
        <div className="flex flex-row gap-8">
          <div className="flex flex-col items-center gap-4">
            <h2 className="text-xl font-bold">Hot</h2>
            <div className="flex gap-4">
              {firstPartPhotos.map((photo) => (
                <div key={photo.id} className="flex flex-col items-center gap-2">
                  <img
                    src={photo.url}
                    alt={photo.description}
                    onClick={() => handlePhotoClick(photo.id)}
                    className="w-52"
                  />
                  <p>{photo.description}</p>
                  <button className="bg-green-700 text-white" onClick={() => handleAddToFavorites(photo.id)}>Add to Favorites</button>
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-col items-center gap-4">
            <h2 className="text-xl font-bold">New Arrival</h2>
            <div className="flex gap-4">
              {secondPartPhotos.map((photo) => (
                <div key={photo.id} className="flex flex-col items-center gap-2">
                  <img
                    src={photo.url}
                    alt={photo.description}
                    onClick={() => handlePhotoClick(photo.id)}
                    className="w-52"
                  />
                  <p>{photo.description}</p>
                  <button className="bg-green-700 text-white" onClick={() => handleAddToFavorites(photo.id)}>Add to Favorites</button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
