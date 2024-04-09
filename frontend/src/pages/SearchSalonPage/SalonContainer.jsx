import React from "react";
import { useNavigate } from "react-router-dom";
import { faImage } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function SalonContainer({ salon }) {
  const navigate = useNavigate();
  return (
    <li
      className="border border-gray-300 rounded-md p-2 my-2"
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
      <h2>{salon.salonname}</h2>
      <p>{salon.address}</p>
    </li>
  );
}
