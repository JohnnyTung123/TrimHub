import React, { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark as faBookmarkSolid, faStar } from '@fortawesome/free-solid-svg-icons';
import { faBookmark as faBookmarkRegular, faComment } from '@fortawesome/free-regular-svg-icons';

const SavedSalonPage = () => {
  const [bookmarks, setBookmarks] = useState({});

  const salons = [
    {
      id: 1,
      name: "ABC Salons",
      location: "Rm123, Shatin",
      priceRange: "$100-$200",
      rating: 4.5,
      imageUrl: "./img/salon.png" 
    }, 
    {
      id: 2,
      name: "ABC Salons",
      location: "Rm123, Shatin",
      priceRange: "$100-$200",
      comments: 450,
      rating: 4.5,
      imageUrl: "./img/salon.png" 
    }
  ];

  const toggleBookmark = (id) => {
    setBookmarks((prevBookmarks) => ({
      ...prevBookmarks,
      [id]: !prevBookmarks[id],
    }));
  };

  return (
    <div className="p-8 bg-gray-200 min-h-screen h-full">
      <h2 className="text-2xl font-bold mb-4 flex items-center">
        <span className="w-2 h-6 bg-green-700 mr-2"></span>
        Saved Salons
      </h2>
      {salons.map((haircut) => (
        <div className="flex items-center mb-5 bg-white rounded-lg shadow-md" key={haircut.id}>
          <img src={haircut.imageUrl} alt="Haircut" className="w-64 h-64 rounded-l-lg object-cover" />
          <div className="flex-grow px-4">
            <h2 className="text-xl font-bold mb-1 flex items-center">
              {haircut.name}
              <button
                className="ml-2 focus:outline-none"
                onClick={() => toggleBookmark(haircut.id)}
              >
                <FontAwesomeIcon
                  icon={bookmarks[haircut.id] ? faBookmarkSolid : faBookmarkRegular}
                />
              </button>
            </h2>
            <p className="text-gray-500 mb-1">{haircut.location}</p>
            <p className="text-green-600 font-bold mb-1">{haircut.priceRange}</p>
            <div className="flex items-center">
              <span className="mr-1">
                <FontAwesomeIcon icon={faComment} />
              </span>
              <span className="text-gray-700 mr-1">
                {haircut.comments}
              </span>
            </div>
            <div className="flex items-center">
              <span className="text-yellow-500 mr-1">
                <FontAwesomeIcon icon={faStar} />
              </span>
              <span className="text-gray-700 mr-1">
                {haircut.rating}
              </span>
            </div>
            <button className="bg-green-500 text-white rounded mt-2 mb-2">
              Contact
            </button>
            <button className="bg-green-700 text-white rounded mt-2 mb-2">
              Book now
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default SavedSalonPage;
