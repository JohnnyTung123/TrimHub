import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-solid-svg-icons";

export default function SalonDetailsPage() {
  const { salonId } = useParams();
  const API_URL = "http://localhost:8080";
  const [salon, setSalon] = useState(null);

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

    fetchSalonInfo(salonId);
  }, [salonId]);

  if (!salon) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="container mx-auto px-4 py-8 text-center">
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
    </div>
  );
}
