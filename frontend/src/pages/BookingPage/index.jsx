import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark as faBookmarkSolid, faStar } from "@fortawesome/free-solid-svg-icons";
import { faBookmark as faBookmarkRegular, faComment } from "@fortawesome/free-regular-svg-icons";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../context/UserContext";

const API_URL = "http://localhost:8080";

const BookingPage = () => {
  const { user } = useUser();
  const [bookings, setBookings] = useState([]);
  const [bookmarks, setBookmarks] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        const response = await fetch(`${API_URL}/booking?userId=${user._id}`);
        if (!response.ok) {
          throw new Error("Error fetching bookings");
        }
        const bookings = await response.json();
        console.log(bookings);
        setBookings(bookings);
      } catch (error) {
        console.error(error);
      }
    }
    fetchBooking();
  }, [user]);

  const toggleBookmark = (id) => {
    setBookmarks((prevBookmarks) => ({
      ...prevBookmarks,
      [id]: !prevBookmarks[id],
    }));
  };

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
      navigate("/messages");
    } catch (error) {
      console.error(error);
    }
  };

  const handleBookAgainClick = (salonId, planId) => {
    navigate(`/salon/${salonId}/bookingconfirmation/${planId}`);
  };

  return (
    <div className="p-8 bg-gray-200 min-h-screen h-full">
      <h2 className="text-2xl font-bold mb-4 flex items-center">
        <span className="w-2 h-6 bg-green-700 mr-2" />
        Bookings
      </h2>
      {bookings.map((booking, index) => (
        <div className="flex items-center mb-5 bg-white rounded-lg shadow-md" key={booking._id}>
          <img
            src={`${API_URL}/salon-info/image?salonId=${booking.plan.salon._id}`}
            alt="Salon"
            className="w-64 h-64 rounded-l-lg object-cover"
          />
          <div className="flex-grow px-4 flex">
            <div>
              <h2 className="text-xl font-bold mb-1 flex items-center">
                {booking.plan.salon.salonname}
                <button
                  className="ml-2 focus:outline-none"
                  onClick={() => toggleBookmark(index)}
                >
                  <FontAwesomeIcon
                    icon={bookmarks[index] ? faBookmarkSolid : faBookmarkRegular}
                  />
                </button>
              </h2>
              <p className="text-gray-500 mb-1">{booking.plan.salon.address}</p>
              <p className="text-green-600 font-bold mb-1">${booking.plan.price}</p>
              <div className="flex items-center">
                <span className="mr-1">
                  <FontAwesomeIcon icon={faComment} />
                </span>
                <span className="text-gray-700 mr-1">
                  {booking.plan.salon.comments}
                </span>
              </div>
              <div className="flex items-center">
                <span className="text-yellow-500 mr-1">
                  <FontAwesomeIcon icon={faStar} />
                </span>
                <span className="text-gray-700 mr-1">
                  {booking.plan.salon.rating}
                </span>
              </div>
              <button
                type="button"
                onClick={() => handleContactClick(booking.plan.salon.user._id)}
                className="bg-green-500 text-white rounded mt-2 mb-2"
              >
                Contact
              </button>
              <button
                type="button"
                onClick={() => handleBookAgainClick(booking.plan.salon._id, booking.plan._id)}
                className="bg-green-700 text-white rounded mt-2 mb-2"
              >
                Book again
              </button>
            </div>
            <div className="bg-gray-100 p-4 rounded-lg flex-col space-y-5">
              <p className="text-green-600 text-lg font-bold mb-1">Plan: {booking.plan.name}</p>
              <p className="text-gray-700 text-lg mb-1">Date: {new Date(booking.date).toLocaleDateString()}</p>
              <p className="text-gray-700 text-lg">Time: {new Date(booking.date).toLocaleTimeString()}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default BookingPage;
