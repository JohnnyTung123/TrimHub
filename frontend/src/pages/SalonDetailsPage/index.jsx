import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-solid-svg-icons";
import { faComment } from "@fortawesome/free-regular-svg-icons";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import NavigationBar from "../NavigationBar";

export default function SalonDetailsPage() {
  const { salonId } = useParams();
  const API_URL = "http://localhost:8080";
  const [salon, setSalon] = useState({
    salonname: "ABC Salons",
    address: "Rm123, Shatin",
    priceRange: "$100~$200",
    comments: 450,
    rating: 4.5,
    imageUrl: "/img/salon.png",
    hairstyles: [
      { _id: "1", name: "Hairstyle 1", imageUrl: "/img/haircut.png" },
      { _id: "2", name: "Hairstyle 2", imageUrl: "/img/haircut.png" },
      { _id: "3", name: "Hairstyle 3", imageUrl: "/img/haircut.png" },
    ],
    plans: [
      { _id: "1", name: "Cut", description: "Description", price: "$100" },
      { _id: "2", name: "Cut + Color", description: "Description", price: "$200" },
      { _id: "3", name: "Treatment", description: "Description", price: "$200" },
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

  if (!salon) {
    return <h1>Loading...</h1>;
  }

  return (
    <div>
      <NavigationBar />
      <div className="p-8 bg-gray-200 h-screen">
        {/* First Row */}
        <div className="flex flex-col md:flex-row mb-8">
          <div className="md:w-1/2 md:pr-4 mb-4 md:mb-0">
            <img src={`${API_URL}/salon-info/image?salonId=${salonId}`} alt="Salon" className="w-full h-auto" />
          </div>
          <div className="md:w-1/2">
            <h1 className="text-3xl font-bold mb-2">{salon.salonname}</h1>
            <p className="text-lg mb-2">{salon.address}</p>
            <p className="text-lg text-green-600 font-bold mb-4">{salon.priceRange}</p>
            <div className="flex items-center mb-2">
              <FontAwesomeIcon icon={faComment} className="mr-2" />
              <span>{salon.comments}</span>
            </div>
            <div className="flex items-center mb-2">
              <FontAwesomeIcon icon={faStar} className="text-yellow-500 mr-2" />
              <span>{salon.rating}</span>
            </div>
            <div className="flex items-center">
              <h2 className="text-2xl font-bold mb-4 flex items-center">
                <span className="w-2 h-6 bg-green-700 mr-2"></span>
                Hairstyle
              </h2>
            </div>
            <div className="flex items-center">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {salon.hairstyles.map((hairstyle) => (
                <div key={hairstyle._id} className="text-center">
                  <img src={`${API_URL}/salon-info/hairstyles?hairstyleId=${hairstyle._id}`} alt={hairstyle.name} className="w-full h-auto mb-2" />
                </div>
            ))}
              </div>
            </div>
            <button className="text-green-600 mb-4">Show more</button>
          </div>
        </div>

        {/* Second Row */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4 flex items-center">
            <span className="w-2 h-6 bg-green-700 mr-2"></span>
            Plans
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            {salon.plans.map((plan) => (
              <div key={plan._id} className="bg-white p-4 rounded-lg shadow-md">
                <p className="font-bold">{plan.name}</p>
                <p className="text-gray-600">{plan.description}</p>
                <p className="text-green-600 font-bold">{plan.price}</p>
              </div>
            ))}
          </div>
          <button className="text-green-600 mb-4">Show more</button>
          <div>
            <button className="px-6 py-2 bg-gray-200 text-gray-800 rounded mr-4">Contact</button>
            <button className="px-6 py-2 bg-green-600 text-white rounded">Book Now</button>
          </div>
        </div>

        {/* Third Row */}
        <div>
          <h2 className="text-2xl font-bold mb-4 flex items-center">
            <span className="w-2 h-6 bg-green-700 mr-2"></span>
            Comment
          </h2>
          {comments.map((comment) => (
            <div key={comment.id} className="mb-4 border border-gray-300 bg-white rounded p-4">
              <div className="flex items-center mb-2">
                <span className="mr-2">{comment.username}</span>
                <div className="flex items-center">
                  <FontAwesomeIcon icon={faStar} className="text-yellow-500 mr-1" />
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
    </div>
  );
}
