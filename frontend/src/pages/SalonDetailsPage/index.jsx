import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-solid-svg-icons";
import { faThumbsUp, faThumbsDown } from "@fortawesome/free-regular-svg-icons";
import { useUserData } from "../../components/utils/UserDataContext";

export default function SalonDetailsPage() {
  const { salonId } = useParams();
  const API_URL = "http://localhost:8080";
  const [salon, setSalon] = useState(null);
  const [comments, setComments] = useState([]);
  const { user } = useUserData();

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
    <div className="container mx-auto px-4 py-8 text-center">
      <h1>Welcome {user ? user.username : "Guest"}</h1>
      {/* if no images */}
      {salon.imagePath ? (
        <img
          src={`${API_URL}/salon-info/image?salonId=${salon._id}`}
          alt="Salon"
          className="w-1/2 h-auto mx-auto mb-4"
        />
      ) : (
        <FontAwesomeIcon
          icon={faImage}
          size="6x"
          className="text-gray-400 mb-4"
        />
      )}
      <h1 className="text-3xl font-bold mb-2">{salon.salonname}</h1>
      <p className="text-lg mb-4">Location: {salon.address}</p>

      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-2">Hairstyles</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {salon.hairstyles.length ? (
            salon.hairstyles.map((hairstyle) => (
              <div key={hairstyle._id} className="border p-4">
                <h3 className="text-xl font-bold mb-2">{hairstyle.name}</h3>
                <img
                  src={`${API_URL}/salon-info/hairstyles?hairstyleId=${hairstyle._id}`}
                  alt="Hairstyle"
                  className="w-full h-auto"
                />
              </div>
            ))
          ) : (
            <p className="col-span-3 text-center">No hairstyles available</p>
          )}
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-2">Plans</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {salon.plans.map((plan) => (
            <div key={plan._id} className="border p-4">
              <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
              <p className="mb-2">{plan.description}</p>
              <p>{plan.price}</p>
            </div>
          ))}
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
