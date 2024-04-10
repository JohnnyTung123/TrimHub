import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../context/UserContext";
import "react-datepicker/dist/react-datepicker.css";

const API_URL = "http://localhost:8080";

export default function BookingConfirmationPage() {
  const { user } = useUser();
  const { salonId, planId } = useParams();

  const [plan, setPlan] = useState({});
  const [bookings, setBookings] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [showBookingConfirmation, setBookingConfirmation] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPlan = async () => {
      try {
        const response = await fetch(`${API_URL}/plan/${planId}`);
        if (!response.ok) {
          throw new Error("Error fetching plan");
        }
        const plan = await response.json();
        console.log(plan);
        setPlan(plan);
      } catch (error) {
        console.error(error);
      }
    };

    const fetchBookings = async () => {
      try {
        const response = await fetch(`${API_URL}/booking?planId=${planId}`);
        if (!response.ok) {
          throw new Error("Error fetching bookings");
        }
        const bookings = await response.json();
        console.log(bookings);
        setBookings(bookings);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPlan();
    fetchBookings();
  }, [planId]);

  const filterTime = (time) => {
    const currentDate = new Date();
    const selectedDate = new Date(time);
    const timeIsFuture = currentDate.getTime() < selectedDate.getTime();
    const timeIsNotBook = !bookings.find((booking) => new Date(booking.date).getTime() === selectedDate.getTime());
    return timeIsFuture && timeIsNotBook;
  };

  const handleBookNowClick = async () => {
    try {
      const response = await fetch(`${API_URL}/booking/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          planId: planId,
          userId: user._id,
          date: selectedDate,
        }),
      });
      if (!response.ok) {
        throw new Error("Error creating booking");
      }
      const booking = await response.json();
      console.log(booking);
      setBookingConfirmation(true);
    } catch (error) {
      console.error(error);
    }
  };

  const handleBackToBookingClick = () => {
    setBookingConfirmation(false);
    navigate("/bookings")
  };

  return (
    <>
      <div className="p-8 bg-gray-200 h-screen">
        <div className="flex flex-col md:flex-row mb-8">
          <div className="md:w-1/2 md:pr-4 mb-4 md:mb-0">
            <img
              src={`${API_URL}/salon-info/image?salonId=${salonId}`}
              alt="Salon"
              className="h-full w-auto"
            />
          </div>
          <div className="md:w-1/2">
            <h2 className="text-2xl font-bold mb-4 flex items-center">
              <span className="w-2 h-6 bg-green-700 mr-2"></span>
              Booking Details
            </h2>
            <div className="h-max w-full p-2 border border-gray-300 rounded bg-white mb-4">
              <p className="text-green-600 text-lg font-bold mb-1">Plan: {plan.name}</p>
              <p className="text-gray-700 text-lg mb-1">Price: ${plan.price}</p>
              <p className="text-gray-700 text-lg">Description: {plan.description}</p>
            </div>
            <div className="mb-4">
              <div className="mb-4">
                <label htmlFor="date" className="font-bold mr-2">Select Date:</label>
                <DatePicker
                  selected={selectedDate}
                  onChange={(date) => setSelectedDate(date)}
                  showIcon
                  showTimeSelect
                  minTime={new Date(0, 0, 0, 10, 0)}
                  maxTime={new Date(0, 0, 0, 20, 0)}
                  filterTime={filterTime}
                  dateFormat="MMMM d, yyyy h:mm aa"
                  className="border rounded focus:outline-none focus:border-blue-500"
                />
              </div>
              <button
                className="bg-green-700 text-white rounded"
                onClick={handleBookNowClick}
              >
                Book Now
              </button>
            </div>
          </div>
        </div>
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
    </>
  );
}
