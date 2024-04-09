import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-solid-svg-icons";
import { faComment } from "@fortawesome/free-regular-svg-icons";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { fetchPlans } from "../ProfilePage/SalonApi";

const API_URL = "http://localhost:8080";

export default function SalonDetailsPage() {
  const { salonId } = useParams();
  const [salon, setSalon] = useState({});
  const [plans, setPlans] = useState([]);
  const [chosenPlanId, setChosenPlanId] = useState("");

  const [comments, setComments] = useState([
    { id: 1, username: "User A", rating: 5, text: "It's good" },
    { id: 2, username: "User B", rating: 1, text: "It's bad" },
  ]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSalon = async (salonId) => {
      try {
        const response = await fetch(
          `${API_URL}/salon-info?salonId=${salonId}`
        );
        if (!response.ok) {
          throw new Error("Error fetching salon info");
        }
        const salon = await response.json();
        setSalon(salon);

        const plans = await fetchPlans(salonId);
        setPlans(plans);
      } catch (error) {
        console.error(error);
      }
    };
    fetchSalon(salonId);
  }, [salonId]);

  const handleContactClick = async () => {
    navigate("/messages");
  };

  const handleBookNowClick = () => {
    if (chosenPlanId === "") {
      return;
    }
    navigate(`/bookingconfirmation/${chosenPlanId}`);
  };

  return (
    <div className="p-8 bg-gray-200 min-h-screen h-full">
      {/* First Row */}
      <div className="flex flex-col md:flex-row mb-8">
        <div className="md:w-1/2 md:pr-4 mb-4 md:mb-0">
          <img src={`${API_URL}/salon-info/image?salonId=${salonId}`} alt="Salon" className="h-full w-auto"/>
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
          <div className="flex items-center mt-6">
            <h2 className="text-2xl font-bold mb-4 flex items-center">
              <span className="w-2 h-6 bg-green-700 mr-2"></span>
              Hairstyle
            </h2>
          </div>
          <div className="flex items-center">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {salon.hairstyles && salon.hairstyles.map((hairstyle) => (
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
          {plans.map((plan) => (
            <button
              key={plan._id}
              className={`${ plan._id === chosenPlanId ? "bg-gray-200" : "bg-white" } text-left rounded-lg shadow-md`}
              onClick={() => setChosenPlanId(plan._id)}
            >
              <p className="font-bold">{plan.name}</p>
              <p className="text-gray-600">{plan.description}</p>
              <p className="text-green-600 font-bold">{plan.price}</p>
            </button>
          ))}
        </div>
        <button className="text-green-600 mb-4">Show more</button>
        <div>
          <button
            type="button"
            className="px-4 py-2 bg-green-400 text-white rounded mr-4"
            onClick={handleContactClick}
          >
            Contact
          </button>
          <button
            type="button"
            className="px-4 py-2 bg-green-700 text-white rounded"
            onClick={handleBookNowClick}
          >
            Book Now
          </button>
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
            className="w-full p-4 border border-gray-300 rounded"
            placeholder="Type something..."
          ></textarea>
        </div>
      </div>
    </div>
  );
}
