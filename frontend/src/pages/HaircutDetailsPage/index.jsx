import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-solid-svg-icons";
import { faComment } from "@fortawesome/free-regular-svg-icons";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { faBookmark as faBookmarkSolid } from "@fortawesome/free-solid-svg-icons";
import { faBookmark as faBookmarkRegular } from "@fortawesome/free-regular-svg-icons";

export default function HaircutDetailsPage() {
  const { salonId } = useParams();
  const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8080";
  const [salon, setSalon] = useState("");
  const [hairstyle, setHairstyle] = useState({
    id: 1,
    haircutname: "Short hair",
    description: "Some description",
    salon: [
      {
        salonname: "ABC Salons",
        address: "Rm123, Shatin",
        priceRange: "$100~$200",
        comments: 450,
        rating: 4.5,
        imageUrl: "/img/salon.png",
      },
    ],
  });

  const [comments, setComments] = useState([
    { id: 1, username: "User A", rating: 5, text: "It's good" },
    { id: 2, username: "User B", rating: 1, text: "It's bad" },
  ]);

  useEffect(() => {
    const fetchSalonInfo = async (salonId) => {
      try {
        const response = await fetch(
          `${API_URL}/salon-info?salonId=${salonId}`
        );
        if (!response.ok) {
          throw new Error("Error fetching salon info");
        }
        const salon = await response.json();
        setSalon(salon);
      } catch (error) {
        console.error(error);
      }
    };

    fetchSalonInfo(salonId);
  }, [salonId]);

  //   if (!salon) {
  //     return <h1>Loading...</h1>;
  //   }

  const toggleBookmark = (id) => {
    setBookmarks((prevBookmarks) => ({
      ...prevBookmarks,
      [id]: !prevBookmarks[id],
    }));
  };

  const [bookmarks, setBookmarks] = useState({});

  return (
    <div className="p-8 bg-gray-200 h-screen">
      {/* First Row */}
      <div className="flex flex-col md:flex-row mb-8">
        <div className="md:w-1/2 md:pr-4 mb-4 md:mb-0">
          <img src={"/img/haircut.png"} alt="Salon" className="w-full h-auto" />
          <p className="text-xl mt-2 text-center">
            {hairstyle.haircutname}
            <button className="ml-2 focus:outline-none">
              <FontAwesomeIcon
                icon={
                  bookmarks[hairstyle.id] ? faBookmarkSolid : faBookmarkRegular
                }
                onClick={() => toggleBookmark(hairstyle.id)}
              />
            </button>
          </p>
        </div>
        <div className="md:w-1/2">
          <h2 className="text-2xl font-bold mb-4 flex items-center">
            <span className="w-2 h-6 bg-green-700 mr-2"></span>
            Description
          </h2>
          <p className="h-1/2 w-full p-2 border border-gray-300 rounded bg-white mb-4">
            {hairstyle.description}
          </p>
          <div className="flex">
            <div key={hairstyle._id} className="text-center mr-4">
              <img
                src={"/img/salon.png"}
                alt={hairstyle.name}
                className="w-full h-auto mb-2"
              />
            </div>
            <div className="flex-grow">
              {hairstyle.salon.map((salon) => (
                <div key={salon._id}>
                  <p className="text-2xl mb-2 font-bold">{salon.salonname}</p>
                  <p className="text-lg mb-2">{salon.address}</p>
                  <p className="text-lg text-green-600 font-bold mb-2">
                    {salon.priceRange}
                  </p>
                  <div className="flex items-center mb-2">
                    <FontAwesomeIcon icon={faComment} className="mr-2" />
                    <p className="text-lg">{salon.comments}</p>
                  </div>
                  <div className="flex items-center mb-2">
                    <FontAwesomeIcon
                      icon={faStar}
                      className="text-yellow-500 mr-2"
                    />
                    <p className="text-lg">{salon.rating}</p>
                  </div>
                </div>
              ))}
              <div>
                <button className="px-6 py-2 bg-gray-200 text-gray-800 rounded mr-4">
                  Contact
                </button>
                <button className="px-6 py-2 bg-green-600 text-white rounded">
                  Book Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Second Row */}
      <div>
        <h2 className="text-2xl font-bold mb-4 flex items-center">
          <span className="w-2 h-6 bg-green-700 mr-2"></span>
          Comment
        </h2>
        {comments.map((comment) => (
          <div
            key={comment.id}
            className="mb-4 border border-gray-300 bg-white rounded p-4"
          >
            <div className="flex items-center mb-2">
              <span className="mr-2">{comment.username}</span>
              <div className="flex items-center">
                <FontAwesomeIcon
                  icon={faStar}
                  className="text-yellow-500 mr-1"
                />
                <span>{comment.rating}</span>
              </div>
            </div>
            <p>{comment.text}</p>
          </div>
        ))}
        <div className="mt-4">
          <textarea
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Type something..."
          ></textarea>
        </div>
      </div>
    </div>
  );
}
