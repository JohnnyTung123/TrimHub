import React, { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark as faBookmarkSolid, faStar } from '@fortawesome/free-solid-svg-icons';
import { faBookmark as faBookmarkRegular, faComment } from '@fortawesome/free-regular-svg-icons';

const SavedHaircutPage = () => {
  const [bookmarks, setBookmarks] = useState({});

  const haircuts = [
    {
      id: 1,
      name: "ABC Salons",
      location: "Rm123, Shatin",
      priceRange: "$100~$200",
      rating: 4.5,
      comments: 450,
      imageUrl: "./img/haircut.png" 
    }, 
    {
      id: 2,
      name: "ABC Salons",
      location: "Rm123, Shatin",
      priceRange: "$100~$200",
      rating: 4.5,
      comments: 450,
      imageUrl: "./img/haircut.png" 
    }
  ];

  const toggleBookmark = (id) => {
    setBookmarks((prevBookmarks) => ({
      ...prevBookmarks,
      [id]: !prevBookmarks[id],
    }));
  };

  return (
    <div className="bg-gray-200 p-5 min-h-screen">
      <h2 className="text-2xl font-bold mb-4 flex items-center">
        <span className="w-2 h-6 bg-green-700 mr-2"></span>
        Saved Haircuts
      </h2>
      <div>
        {haircuts.map((haircut) => (
          <div className="flex items-center mb-5 bg-white rounded-lg shadow-md" key={haircut.id}>
            <img src={haircut.imageUrl} alt="Haircut" className="w-52 h-62 rounded-l-lg object-cover" />
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
                <span className="text-gray-700 mr-1">{haircut.comments}</span>
              </div>
              <div className="flex items-center">
                <span className="text-yellow-500 mr-1">
                  <FontAwesomeIcon icon={faStar} />
                </span>
                <span className="text-gray-700 mr-1">{haircut.rating}</span>
              </div>
              <button className="text-white rounded mb-2">
                Contact
              </button>
              <button className="text-white rounded mb-2">
                Book now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SavedHaircutPage;
