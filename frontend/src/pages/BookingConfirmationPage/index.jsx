import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-solid-svg-icons";
import { faComment } from "@fortawesome/free-regular-svg-icons";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { faBookmark as faBookmarkSolid } from '@fortawesome/free-solid-svg-icons';
import { faBookmark as faBookmarkRegular } from '@fortawesome/free-regular-svg-icons';
import { useNavigate } from "react-router-dom";
import NavigationBar from "../NavigationBar";

export default function BookingConfirmationPage() {
  const { salonId } = useParams();
  const API_URL = "http://localhost:8080";
  const [salon, setSalon] = useState("");
  const [hairstyle, setHairstyle] = useState({
    id: 1,
    haircutname: "Short hair",
    description: "Some description",
    salon: [
      { salonname: "ABC Salons",
      address: "Rm123, Shatin",
      priceRange: "$100~$200",
      comments: 450,
      rating: 4.5,
      imageUrl: "/img/salon.png", },
    ],
  });

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

    const [selectedDate, setSelectedDate] = useState("");
    const [selectedTime, setSelectedTime] = useState("");
    const [showBookingConfirmation, setBookingConfirmation] = useState(false);
    const navigate = useNavigate();

    const handleDateChange = (e) => {
        setSelectedDate(e.target.value);
    };

    const handleTimeChange = (e) => {
        setSelectedTime(e.target.value);
    };

    const handleBookNowClick = () => {
        setBookingConfirmation(true);
    };
    
    const handleBackToBookingClick = () => {
        setBookingConfirmation(false);
        navigate("/bookings")
    };

  return (
    <div>
      <NavigationBar />
      <div className="p-8 bg-gray-200 h-screen">
        {/* First Row */}
        <div className="flex flex-col md:flex-row mb-8">
            <div className="md:w-1/2 md:pr-4 mb-4 md:mb-0">
                <img src={"/img/haircut.png"} alt="Salon" className="w-full h-auto" />
                <p className="text-xl mt-2 text-center">{hairstyle.haircutname}
                    <button className="ml-2 focus:outline-none">
                        <FontAwesomeIcon
                        icon={bookmarks[hairstyle.id] ? faBookmarkSolid : faBookmarkRegular}
                        onClick={() => toggleBookmark(hairstyle.id)}
                        />
                    </button>
                </p>
            </div>
            <div className="md:w-1/2">
                <h2 className="text-2xl font-bold mb-4 flex items-center">
                <span className="w-2 h-6 bg-green-700 mr-2"></span>
                Booking Details
                </h2>
                <p className="h-1/2 w-full p-2 border border-gray-300 rounded bg-white mb-4">{hairstyle.description}</p>
                <div className="mb-4">
                    <div className="mb-4">
                        <label htmlFor="date" className="font-bold">Select Date:</label>
                        <input
                            type="date"
                            id="date"
                            value={selectedDate}
                            onChange={handleDateChange}
                            className="border border-gray-300 rounded px-2 py-1 ml-2"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="time" className="font-bold">Select Time:</label>
                        <select
                            id="time"
                            value={selectedTime}
                            onChange={handleTimeChange}
                            className="border border-gray-300 rounded px-2 py-1 ml-2"
                        >
                            <option value="">Select Time</option>
                            <option value="18:00">12:00</option>
                            <option value="18:00">12:30</option>
                            <option value="18:00">13:00</option>
                            <option value="18:00">13:30</option>
                            <option value="18:00">14:00</option>
                            <option value="18:00">14:30</option>
                            <option value="18:00">15:00</option>
                            <option value="18:00">15:30</option>
                            <option value="18:00">16:00</option>
                            <option value="18:00">16:30</option>
                            <option value="18:00">17:00</option>
                            <option value="18:00">17:30</option>
                            <option value="18:00">18:00</option>
                            <option value="18:30">18:30</option>
                    
                        </select>
                    </div>
                    <button
                    className="px-6 py-2 bg-green-600 text-white rounded"
                    onClick={handleBookNowClick}
                    >
                        Book Now
                    </button>
                </div>
            </div>
        </div>

        {/* Second Row */}
      </div>
      {showBookingConfirmation && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Booking successful</h2>
            <p className="mb-4">Your booking is successful!</p>
            <button
              className="bg-green-500 text-white px-4 py-2"
              onClick={handleBackToBookingClick}
            >
              Back to Bookings
            </button>
          </div>
        </div>
      )}
    </div>

    
  );
}