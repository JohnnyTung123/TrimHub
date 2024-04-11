import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp, faThumbsDown } from "@fortawesome/free-regular-svg-icons";
import { useNavigate } from "react-router-dom";
import { fetchHairstyles, fetchPlans } from "../ProfilePage/SalonApi";
import { useUser } from "../../context/UserContext";

const API_URL = "http://localhost:8080";

export default function SalonDetailsPage() {
  const { user } = useUser();
  const { salonId } = useParams();

  const [salon, setSalon] = useState({});
  const [hairstyles, setHairstyles] = useState([]);
  const [plans, setPlans] = useState([]);
  const [chosenPlanId, setChosenPlanId] = useState("");

  const [numLikes, setNumLikes] = useState(0);
  const [numDislikes, setNumDislikes] = useState(0);
  const [isFollowing, setIsFollowing] = useState(false);

  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");
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

        // Get the number of likes and dislikes
        const likes = salon.reaction.filter(
          (reaction) => reaction.response === "like"
        ).length;
        const dislikes = salon.reaction.filter(
          (reaction) => reaction.response === "dislike"
        ).length;
        setNumLikes(likes);
        setNumDislikes(dislikes);

        const hairstyles = await fetchHairstyles(salonId);
        setHairstyles(hairstyles);

        const plans = await fetchPlans(salonId);
        setPlans(plans);
      } catch (error) {
        console.error(error);
      }
    };
    fetchSalon(salonId);
  }, [salonId]);

  useEffect(() => {
    const fetchComments = async (salonId) => {
      try {
        const response = await fetch(`${API_URL}/comment?salonId=${salonId}`);
        if (!response.ok) {
          throw new Error("Error fetching comments");
        }
        const comments = await response.json();
        setComments(comments);

        console.log(comments);
      } catch (error) {
        console.error(error);
      }
    };
    fetchComments(salonId);
  }, [salonId]);

  // check if user is following the salon
  useEffect(() => {
    const checkFollowing = async () => {
      try {
        const response = await fetch(
          `${API_URL}/user/followed-salons/${user._id}`
        );
        if (!response.ok) {
          throw new Error("Error fetching followed salons");
        }
        const followedSalons = await response.json();
        console.log(followedSalons);
        console.log(salonId);
        setIsFollowing(followedSalons.some(salon => salon._id === salonId));
      } catch (error) {
        console.error(error);
      }
    };
    checkFollowing();
  }, [user, salonId]);

  const handleContactClick = async () => {
    try {
      const response = await fetch(`${API_URL}/chat/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          senderId: user._id,
          receiverId: salon.user._id,
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

  const handleBookNowClick = () => {
    if (chosenPlanId === "") {
      return;
    }
    navigate(`bookingconfirmation/${chosenPlanId}`);
  };

  const handleReaction = async (salonId, reactionType) => {
    if (!user) {
      alert("Please login first");
    }
    try {
      const response = await fetch(
        `${API_URL}/salon-info/reaction/${salonId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: user.username,
            response: reactionType,
          }),
        }
      );
      if (!response.ok) {
        throw new Error("Error reacting to salon");
      }
      const updatedSalon = await response.json();
      console.log(updatedSalon);
      const likes = updatedSalon.reaction.filter(
        (reaction) => reaction.response === "like"
      ).length;
      const dislikes = updatedSalon.reaction.filter(
        (reaction) => reaction.response === "dislike"
      ).length;
      setNumLikes(likes);
      setNumDislikes(dislikes);
      setSalon(updatedSalon);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCreateComment = async () => {
    if (!user) {
      alert("Please login first");
    }
    try {
      const response = await fetch(`${API_URL}/comment/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: user.username,
          content: commentText,
          salonId,
        }),
      });
      if (!response.ok) {
        throw new Error("Error creating comment");
      }
      const newComment = await response.json();
      console.log(newComment);
      setComments([newComment.comment, ...comments]);
      setCommentText("");
    } catch (error) {
      console.error(error);
    }
  };

  const handleFollowClick = async () => {
    if (!user) {
      alert("Please login first");
      return;
    }
    try {
      const response = await fetch(`${API_URL}/user/follow-salon`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: user._id,
          salonId,
          follow: !isFollowing,
        }),
      });
      if (!response.ok) {
        throw new Error("Error following/unfollowing salon");
      }
      setIsFollowing(!isFollowing);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="p-8 bg-gray-200 min-h-screen h-full">
      {/* First Row */}
      <div className="flex flex-col md:flex-row mb-8">
        <div className="md:w-1/2 md:pr-4 mb-4 md:mb-0">
          <img
            src={`${API_URL}/salon-info/image?salonId=${salonId}`}
            alt="Salon"
            className="h-full w-auto"
          />
        </div>
        <div className="md:w-1/2">
          <h1 className="text-3xl font-bold mb-2">{salon.salonname}</h1>
          <p className="text-lg mb-2">{salon.address}</p>
          <div className="flex items-center mb-2">
            {/* handle like or dislike */}
            <FontAwesomeIcon
              icon={faThumbsUp}
              className={`mr-2 cursor-pointer
              ${
                user &&
                salon.reaction &&
                salon.reaction.find(
                  (reaction) =>
                    reaction.username === user.username &&
                    reaction.response === "like"
                ) &&
                "text-green-500"
              }`}
              onClick={() => handleReaction(salon._id, "like")}
            />
            <span>{numLikes}</span>
            <FontAwesomeIcon
              icon={faThumbsDown}
              className={`ml-4 mr-2 cursor-pointer
              ${
                user &&
                salon.reaction &&
                salon.reaction.find(
                  (reaction) =>
                    reaction.username === user.username &&
                    reaction.response === "dislike"
                ) &&
                "text-red-500"
              }`}
              onClick={() => handleReaction(salon._id, "dislike")}
            />
            <span>{numDislikes}</span>
          </div>
          {/* follow/unfollow button */}
          {user && (
            <button
              className={`px-4 py-2 mt-1 text-white rounded ${isFollowing ? "bg-gray-400" : "bg-green-400"}`}
              onClick={handleFollowClick}
            >
              {isFollowing ? "Unfollow" : "Follow"}
            </button>
          )}
        </div>
      </div>

      <div className="mb-8">
        <div className="flex items-center mt-6">
          <h2 className="text-2xl font-bold mb-4 flex items-center">
            <span className="w-2 h-6 bg-green-700 mr-2"></span>
            Hairstyle
          </h2>
        </div>
        <div className="flex items-center">
          <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
            {hairstyles.map((hairstyle) => (
              <div key={hairstyle._id} className="text-center">
                <img
                  src={`${API_URL}/hairstyle/${hairstyle._id}`}
                  alt={`Hairstyle ${hairstyle._id}`}
                  className="h-64 object-cover"
                />
                <p className="my-2">{hairstyle.description}</p>
              </div>
            ))}
          </div>
        </div>
        {/*<button className="text-green-600 mb-4">Show more</button>*/}
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
              className={`${
                plan._id === chosenPlanId ? "bg-gray-200" : "bg-white"
              } text-left rounded-lg shadow-md`}
              onClick={() => setChosenPlanId(plan._id)}
            >
              <p className="font-bold">{plan.name}</p>
              <p className="text-gray-600">{plan.description}</p>
              <p className="text-green-600 font-bold">{plan.price}</p>
            </button>
          ))}
        </div>
          {/*<button className="text-green-600 mb-4">Show more</button>*/}
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
        {/* if no comment */}
        {comments.length === 0 ? (
          <p>No comments yet</p>
        ) : (
          <div className="h-96 overflow-y-scroll">
            {comments.map((comment) => (
              <div
                key={comment._id}
                className="mb-4 border border-gray-300 bg-white rounded p-4"
              >
                <div className="flex items-center mb-2">
                  <span className="mr-2">{comment.username}</span>
                  <div className="flex items-center">
                    {/* <FontAwesomeIcon
                    icon={faThumbsUp}
                    className={`ml-4 mr-1 cursor-pointer ${
                      comment.reaction &&
                      comment.reaction.find(
                        (reaction) =>
                          reaction.username === user.username &&
                          reaction.response === "like"
                      ) &&
                      "text-green-500"
                    }`}
                    onClick={() => handleReaction(comment._id, "like")}
                  />
                  <span className="mr-1">{comment.likes}</span>
                  <FontAwesomeIcon
                    icon={faThumbsDown}
                    className={`ml-4 mr-1 cursor-pointer ${
                      comment.reaction &&
                      comment.reaction.find(
                        (reaction) =>
                          reaction.username === user.username &&
                          reaction.response === "dislike"
                      ) &&
                      "text-red-500"
                    }`}
                    onClick={() => handleReaction(comment._id, "dislike")}
                  />
                  <span>{comment.dislikes}</span> */}
                  </div>
                </div>
                <p>{comment.content}</p>
              </div>
            ))}
          </div>
        )}
        <div className="mt-4">
          <h3 className="text-xl font-bold mb-2">Add Comment</h3>
          <textarea
            className="w-full p-4 border border-gray-300 rounded"
            placeholder="Type something..."
            onChange={(e) => setCommentText(e.target.value)}
            value={commentText}
          ></textarea>
          <button
            onClick={handleCreateComment}
            className="mt-4 px-4 py-2 bg-green-700 text-white rounded"
          >
            Post
          </button>
        </div>
      </div>
    </div>
  );
}
