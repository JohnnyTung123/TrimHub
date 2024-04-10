import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { faImage } from "@fortawesome/free-solid-svg-icons";
import { faThumbsUp, faThumbsDown } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function SalonContainer({ salon }) {
  const navigate = useNavigate();
  const [numLikes, setNumLikes] = useState(0);
  const [numDislikes, setNumDislikes] = useState(0);

  useEffect(() => {
    setNumLikes(salon.reaction.filter((r) => r.response === "like").length);
    setNumDislikes(
      salon.reaction.filter((r) => r.response === "dislike").length
    );
  }, [salon.reaction]);

  return (
    <li
      className="bg-white border border-gray-300 rounded-md p-2 my-2 cursor-pointer"
      onClick={() => navigate(`/salon/${salon._id}`)}
    >
      {salon.imagePath ? (
        <img
          src={`http://localhost:8080/salon-info/image?salonId=${salon._id}`}
          alt="Salon"
          className="w-32 h-32 object-cover rounded-md"
        />
      ) : (
        <FontAwesomeIcon
          icon={faImage}
          className="w-32 h-32 object-cover rounded-md"
        />
      )}
      <h3 className="text-xl font-bold mt-2">{salon.salonname}</h3>
      <p className="mb-2">{salon.address}</p>

      <div className="flex justify-between w-20">
        <div>
          <FontAwesomeIcon icon={faThumbsUp} /> {numLikes}
        </div>
        <div>
          <FontAwesomeIcon icon={faThumbsDown} /> {numDislikes}
        </div>
      </div>
    </li>
  );
}
