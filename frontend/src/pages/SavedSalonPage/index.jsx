import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBookmark as faBookmarkSolid,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
import {
  faBookmark as faBookmarkRegular,
  faComment,
} from "@fortawesome/free-regular-svg-icons";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../context/UserContext";

const API_URL = "http://localhost:8080";

const SavedSalonPage = () => {
  const { user } = useUser();
  const navigate = useNavigate();
  const [savedSalons, setSavedSalons] = useState([]);
  const [bookmarks, setBookmarks] = useState({});

  // function to show the salons that the user following
  useEffect(() => {
    const fetchSavedSalons = async () => {
      try {
        const response = await fetch(`${API_URL}/user/followed-salons/${user._id}`);
        if (!response.ok) {
          throw new Error("Error fetching savedsalons");
        }
        const savedsalons = await response.json();
        console.log(savedsalons);
        setSavedSalons(savedsalons);
      } catch (error) {
        console.error(error);
      }
    }
    fetchSavedSalons();
  }, [user]);

  const toggleBookmark = (id) => {
    setBookmarks((prevBookmarks) => ({
      ...prevBookmarks,
      [id]: !prevBookmarks[id],
    }));
  };

  // function to show chat room after clicking contact button
  const handleContactClick = async (salonUserId) => {
    try {
      const response = await fetch(`${API_URL}/chat/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          senderId: user._id,
          receiverId: salonUserId,
        }),
      });
      if (!response.ok) {
        throw new Error("Error creating chat");
      }
      const chat = await response.json();
      console.log(chat);
      navigate(`/messages?chatId=${chat._id}`);
    } catch (error) {
      console.error(error);
    }
  };

  // function to correspond salon page after clicking book now button
  const handleBookNowClick = (salonId) => {
    navigate(`/salon/${salonId}`);
  };

  return (
    <div className="p-8 bg-gray-200 min-h-screen h-full">
      <h2 className="text-2xl font-bold mb-4 flex items-center">
        <span className="w-2 h-6 bg-green-700 mr-2"></span>
        Followed Salons
      </h2>
      {savedSalons.map((salon) => (
        <div
          className="flex items-center mb-5 bg-white rounded-lg shadow-md"
          key={salon._id}
        >
          <img
            src={`${API_URL}/salon-info/image?salonId=${salon._id}`}
            alt="Haircut"
            className="w-64 h-64 rounded-l-lg object-cover"
          />
          <div className="flex-grow px-4">
            <h2 className="text-xl font-bold mb-1 flex items-center">
              {salon.salonname}
              <button
                className="ml-2 focus:outline-none"
                onClick={() => toggleBookmark(salon._id)}
              >
                <FontAwesomeIcon
                  icon={bookmarks[salon._id] ? faBookmarkSolid : faBookmarkRegular}
                />
              </button>
            </h2>
            <p className="text-gray-500 mb-1">{salon.address}</p>
            {<p className="text-green-600 font-bold mb-1">
              {salon.priceRange}
            </p> }
            {<div className="flex items-center">
              <span className="mr-1">
                <FontAwesomeIcon icon={faComment} />
              </span>
              <span className="text-gray-700 mr-1">{salon.comments}</span>
            </div>}
            {<div className="flex items-center">
              <span className="text-yellow-500 mr-1">
                <FontAwesomeIcon icon={faStar} />
              </span>
              <span className="text-gray-700 mr-1">{salon.rating}</span>
            </div> }
              <button
                type="button"
                onClick={() => handleContactClick(salon.user._id)}
                className="bg-green-500 text-white rounded mt-2 mb-2"
              >
                Contact
              </button>
              <button
                type="button"
                onClick={() => handleBookNowClick(salon._id)}
                className="bg-green-700 text-white rounded mt-2 mb-2"
              >
                Book Now
              </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SavedSalonPage;
