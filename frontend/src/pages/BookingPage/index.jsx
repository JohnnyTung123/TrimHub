import React, { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark as faBookmarkSolid } from '@fortawesome/free-solid-svg-icons';
import { faBookmark as faBookmarkRegular, faComment } from '@fortawesome/free-regular-svg-icons';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import NavigationBar from "../NavigationBar";

const BookingPage = () => {
  const [bookmarks, setBookmarks] = useState({});

  const bookings = [
    {
      id: 1,
      name: "ABC Salons",
      location: "Rm123, Shatin",
      priceRange: "$100-$200",
      rating: 4.5,
      imageUrl: "./img/salon.png",
      plan: "Cut $100",
      date: "19/03/2024",
      time: "15:00-16:00"
    },
    {
      id: 2,
      name: "ABC Salons",
      location: "Rm123, Shatin",
      priceRange: "$100-$200",
      comments: 450,
      rating: 4.5,
      imageUrl: "./img/salon.png",
      plan: "Cut $100",
      date: "19/03/2024",
      time: "15:00-16:00"
    }
  ];

  const toggleBookmark = (id) => {
    setBookmarks((prevBookmarks) => ({
      ...prevBookmarks,
      [id]: !prevBookmarks[id],
    }));
  };

  return (
    <div>
      <NavigationBar />

      <main className="bg-gray-200 p-5 min-h-screen">
        <h2 className="text-2xl font-bold mb-4 flex items-center">
          <span className="w-2 h-6 bg-green-700 mr-2" />
          Bookings
        </h2>
        <div>
          {bookings.map((booking) => (
            <div className="flex items-center mb-5 bg-white rounded-lg shadow-md" key={booking.id}>
              <img src={booking.imageUrl} alt="Haircut" className="w-64 h-64 rounded-l-lg object-cover" />
              <div className="flex-grow px-4 flex justify-normal">
                <div>
                  <h2 className="text-xl font-bold mb-1 flex items-center">
                    {booking.name}
                    <button
                      className="ml-2 focus:outline-none"
                      onClick={() => toggleBookmark(booking.id)}
                    >
                      <FontAwesomeIcon
                        icon={bookmarks[booking.id] ? faBookmarkSolid : faBookmarkRegular}
                      />
                    </button>
                  </h2>
                  <p className="text-gray-500 mb-1">{booking.location}</p>
                  <p className="text-green-600 font-bold mb-1">{booking.priceRange}</p>
                  <div className="flex items-center">
                    <span className="mr-1">
                      <FontAwesomeIcon icon={faComment} />
                    </span>
                    <span className="text-gray-700 mr-1">{booking.comments}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-yellow-500 mr-1">
                      <FontAwesomeIcon icon={faStar} />
                    </span>
                    <span className="text-gray-700 mr-1">{booking.rating}</span>
                  </div>
                  <button className="text-white rounded mb-2">
                    Contact
                  </button>
                  <button className="text-white rounded mb-2">
                    Book again
                  </button>
                </div>
                <div className="bg-gray-100 p-4 rounded-lg flex-col space-y-5">
                  <p className="text-green-600 text-lg font-bold mb-1">Plan: {booking.plan}</p>
                  <p className="text-gray-700 text-lg mb-1">Date: {booking.date}</p>
                  <p className="text-gray-700 text-lg">Time: {booking.time}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default BookingPage;
