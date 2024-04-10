import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp, faThumbsDown } from "@fortawesome/free-regular-svg-icons";
import { useUser } from "../../context/UserContext";
import { faComment } from "@fortawesome/free-regular-svg-icons";
import { faStar } from "@fortawesome/free-solid-svg-icons";

export default function SalonDetailsPage() {
  const { salonId } = useParams();
  const API_URL = "http://localhost:8080";
  const [salon, setSalon] = useState(null);
  const [comments, setComments] = useState([]);
  const { user } = useUser();

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
        console.log("Got Salon Info:", salon);
        console.log("salonId", salonId);
        setSalon(salon);
      } catch (error) {
        console.error(error);
      }
    };

    const fetchComments = async (salonId) => {
      try {
        const response = await fetch(`${API_URL}/comment?salonId=${salonId}`);
        if (!response.ok) {
          throw new Error("Error fetching comments");
        }
        const comments = await response.json();
        console.log("Got Comments:", comments);
        setComments(comments);
      } catch (error) {
        console.error(error);
      }
    };
    fetchComments(salonId);
    fetchSalonInfo(salonId);
    console.log("user", user);
  }, [salonId, user]);

  if (!salon) {
    return <h1>Loading...</h1>;
  }

  const writeComment = async (e) => {
    e.preventDefault();
    const content = e.target[0].value;
    const username = "user1"; // hardcoding username for now
    const salonId = salon._id;

    try {
      const response = await fetch(`${API_URL}/comment`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content, username, salonId }),
      });
      if (!response.ok) {
        throw new Error("Error writing comment");
      }
      console.log("Comment written successfully");
      e.target[0].value = "";
      setComments([...comments, { content, username, _id: Date.now() }]);
    } catch (error) {
      console.error(error);
    }
  };

  const likeComment = async (commentId) => {
    try {
      const response = await fetch(`${API_URL}/comment/like`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ commentId }),
      });
      if (!response.ok) {
        throw new Error("Error liking comment");
      }
      console.log("Comment liked successfully");
    } catch (error) {
      console.error(error);
    }
  };

  const dislikeComment = async (commentId) => {
    try {
      const response = await fetch(`${API_URL}/comment/dislike`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ commentId }),
      });
      if (!response.ok) {
        throw new Error("Error disliking comment");
      }
      console.log("Comment disliked successfully");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="p-8 bg-gray-200 h-screen">
      {/* First Row */}
      <div className="flex flex-col md:flex-row mb-8">
        <div className="md:w-1/2 md:pr-4 mb-4 md:mb-0">
          <img
            src={`${API_URL}/salon-info/image?salonId=${salonId}`}
            alt="Salon"
            className="w-full h-auto"
          />
        </div>
        <div className="md:w-1/2">
          <h1 className="text-3xl font-bold mb-2">{salon.salonname}</h1>
          <p className="text-lg mb-2">{salon.address}</p>
          <p className="text-lg text-green-600 font-bold mb-4">
            {salon.priceRange}
          </p>
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
                  <img
                    src={`${API_URL}/salon-info/hairstyles?hairstyleId=${hairstyle._id}`}
                    alt={hairstyle.name}
                    className="w-full h-auto mb-2"
                  />
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
          <button className="px-6 py-2 bg-gray-200 text-gray-800 rounded mr-4">
            Contact
          </button>
          <button className="px-6 py-2 bg-green-600 text-white rounded">
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
      {/* Post management */}
      <div>
        {/* fetch the comments hostory */}
        <h2 className="text-2xl font-bold mb-2">Comments</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {comments.length ? (
            comments.map((comment) => (
              <div key={comment._id} className="border p-4">
                <h3 className="text-xl font-bold mb-2">{comment.username}</h3>
                <p>{comment.content}</p>
                <div className="flex justify-between mt-4">
                  <button onClick={() => likeComment(comment._id)}>
                    <FontAwesomeIcon icon={faThumbsUp} />
                  </button>
                  <button onClick={() => dislikeComment(comment._id)}>
                    <FontAwesomeIcon icon={faThumbsDown} />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="col-span-3 text-center">No comments</p>
          )}
        </div>
        {/* user with username can make comment of the salon*/}
        <form onSubmit={writeComment} className="mt-4">
          <input
            type="text"
            placeholder="Write a comment"
            className="w-1/2 p-2"
          />
          <button className="bg-blue-500 text-white px-4 py-2 ml-2">
            Comment
          </button>
        </form>
      </div>
    </div>
  );
}
