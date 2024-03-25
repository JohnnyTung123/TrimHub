import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-solid-svg-icons";

const SalonProfile = ({ user }) => {
  const [salonId, setSalonId] = useState("");
  const [salonName, setSalonName] = useState("");
  const [address, setAddress] = useState("");
  const [salonImage, setSalonImage] = useState(null);
  const [newSalonImage, setNewSalonImage] = useState(null);

  const fetchSalonInfo = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/salon-info?username=${user.username}`
      );
      if (!response.ok) {
        throw Error("Cannot fetch data.");
      }
      const data = await response.json();
      setSalonId(data._id);
      setSalonName(data.salonname);
      setAddress(data.address || "");
    } catch (err) {
      console.error(err);
    }

    try {
      const response = await fetch(
        `http://localhost:8080/salon-info/image?username=${user.username}`
      );
      if (!response.ok) {
        throw Error("Cannot fetch data.");
      }
      const data = await response.blob();
      setSalonImage(URL.createObjectURL(data)); // Convert blob to URL
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchSalonInfo();
  }, []);

  const changeSalonInfo = async (e) => {
    e.preventDefault();
    // upload salon image first if there is a new image
    if (newSalonImage) {
      await uploadSalonImage();
    }

    try {
      const response = await fetch(
        `http://localhost:8080/salon-info/${salonId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            salonname: salonName,
            address: address,
          }),
        }
      );
      if (!response.ok) {
        throw Error("Cannot update data.");
      }
    } catch (err) {
      console.error(err);
    }
    alert("Salon information updated successfully.");
  };

  const uploadSalonImage = async () => {
    const formData = new FormData();
    formData.append("salon-image", newSalonImage);

    try {
      const response = await fetch(
        `http://localhost:8080/salon-info/image/${salonId}`,
        {
          method: "PUT",
          body: formData,
        }
      );
      if (!response.ok) {
        throw Error("Cannot update data.");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="p-5 font-sans">
      <h1 className="text-3xl font-bold mb-5">Salon Profile</h1>
      <div className="flex flex-col mb-5">
        <div className="w-48 h-48 w-48 h-48 mr-5 object-cover border rounded-md flex items-center justify-center">
          {salonImage ? (
            <img
              src={
                newSalonImage ? URL.createObjectURL(newSalonImage) : salonImage
              }
              className="w-48 h-48 mr-5 object-cover border rounded-md"
              alt="Salon"
            />
          ) : (
            <FontAwesomeIcon icon={faImage} size="3x" className="mr-5" />
          )}
        </div>
        <div>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setNewSalonImage(e.target.files[0])}
            className="mb-3"
          />
          {/* <button
            onClick={uploadSalonImage}
            className="px-4 py-2 bg-blue-500 text-white rounded-md text-sm"
          >
            Upload New Photo
          </button> */}
        </div>
      </div>
      <form onSubmit={changeSalonInfo}>
        <div className="mb-5">
          <label className="text-lg mr-2">Salon Name:</label>
          <input
            type="text"
            value={salonName}
            onChange={(e) => setSalonName(e.target.value)}
            className="px-3 py-2 border rounded-md"
          />
        </div>
        <div className="mb-5">
          <label className="text-lg mr-2">Address:</label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="px-3 py-2 border rounded-md"
          />
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-green-500 text-white rounded-md text-lg"
        >
          Change Salon Information
        </button>
      </form>
    </div>
  );
};

export default SalonProfile;
