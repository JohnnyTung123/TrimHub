import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage, faTimes } from "@fortawesome/free-solid-svg-icons";
import { set } from "mongoose";

const SalonProfile = ({ user }) => {
  const [salonId, setSalonId] = useState("");
  const [salonName, setSalonName] = useState("");
  const [address, setAddress] = useState("");
  const [salonImage, setSalonImage] = useState(null);
  const [newSalonImage, setNewSalonImage] = useState(null);
  const [showUploadForm, setShowUploadForm] = useState(false);
  const [hairstyleImage, setHairstyleImage] = useState(null);
  const [hairstyleDescription, setHairstyleDescription] = useState("");
  const [hairstyles, setHairstyles] = useState([]);
  const [showPlanForm, setShowPlanForm] = useState(false);
  const [plans, setPlans] = useState([]);
  const [planName, setPlanName] = useState("");
  const [planPrice, setPlanPrice] = useState("");
  const [planDescription, setPlanDescription] = useState("");

  // 1. Fetch salon information
  const fetchSalonInfo = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/salon-info?username=${user.username}`
      );
      if (!response.ok) {
        throw Error("Cannot fetch data.");
      }
      const data = await response.json();
      console.log(data);
      setSalonId(data._id);
      setSalonName(data.salonname);
      setAddress(data.address || "");
      setPlans(data.plans || []);
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
      console.log(response);
      const data = await response.blob();
      console.log(data);
      setSalonImage(URL.createObjectURL(data)); // Convert blob to URL
    } catch (err) {
      console.error(err);
    }

    // Fetch hairstyles
    try {
      const response = await fetch(
        `http://localhost:8080/salon-info/hairstyles?username=${user.username}`
      );
      if (!response.ok) {
        throw Error("Cannot fetch data.");
      }
      // Problem: how to display the image?
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchSalonInfo();
  }, []);

  // 2. change salon information
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
      alert("Salon information updated successfully.");
    } catch (err) {
      console.error(err);
    }
  };

  // 3. Upload salon image
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

  // 4. create new hairstyle
  const createHairstyle = async (e) => {
    e.preventDefault();
    if (!hairstyleImage) {
      alert("Please upload an image.");
      return;
    }
    if (!hairstyleDescription) {
      alert("Please enter a description.");
      return;
    }

    const formData = new FormData();
    formData.append("hairstyle-image", hairstyleImage);
    formData.append("description", hairstyleDescription);

    try {
      const response = await fetch(
        `http://localhost:8080/salon-info/hairstyles/${salonId}`,
        {
          method: "PUT",
          body: formData,
        }
      );
      if (!response.ok) {
        throw Error("Cannot upload hairstyle image.");
      }
    } catch (error) {
      console.error(error);
    }

    setShowUploadForm(false);

    setHairstyles([
      ...hairstyles,
      {
        image: URL.createObjectURL(hairstyleImage),
        description: hairstyleDescription,
      },
    ]);

    setHairstyleImage(null);
    setHairstyleDescription("");
  };

  // 5. create new plan
  const createPlan = async (e) => {
    e.preventDefault();
    if (!planName) {
      alert("Please enter a plan name.");
      return;
    }
    if (!planPrice) {
      alert("Please enter a plan price.");
      return;
    }
    if (!planDescription) {
      alert("Please enter a plan description.");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:8080/salon-info/plans/${salonId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: planName,
            price: planPrice,
            description: planDescription,
          }),
        }
      );
      if (!response.ok) {
        throw Error("Cannot create plan.");
      }
      setShowPlanForm(false);

      setPlans([
        ...plans,
        {
          name: planName,
          price: planPrice,
          description: planDescription,
        },
      ]);

      setPlanName("");
      setPlanPrice("");
      setPlanDescription("");
    } catch (error) {
      console.error(error);
    }
  };

  // 6. delete plan
  const deletePlan = async (index) => {
    try {
      const response = await fetch(
        `http://localhost:8080/salon-info/plans/${salonId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            index,
          }),
        }
      );
      if (!response.ok) {
        throw Error("Cannot delete plan.");
      }
      const newPlans = [...plans];
      newPlans.splice(index, 1);
      setPlans(newPlans);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="p-5 font-sans">
      <h1 className="text-3xl font-bold mb-5">Salon Profile</h1>
      <div className="flex flex-col mb-5">
        <div className="w-48 h-48 w-48 h-48 mr-5 object-cover border rounded-md flex items-center justify-center">
          {newSalonImage ? (
            <img
              src={URL.createObjectURL(newSalonImage)}
              className="w-48 h-48 mr-5 object-cover border rounded-md"
              alt="Salon"
            />
          ) : salonImage ? (
            <img
              src={salonImage}
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
            onChange={(e) => {
              setNewSalonImage(e.target.files[0]);
            }}
            className="mb-3"
          />
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
      {showUploadForm && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
          <form
            onSubmit={createHairstyle}
            className="bg-white p-10 rounded-md shadow-lg "
          >
            <FontAwesomeIcon
              icon={faTimes}
              onClick={() => setShowUploadForm(false)}
              className="text-2xl absolute top-3 right-3 cursor-pointer"
            />
            <h2 className="text-2xl font-bold mb-4 text-center">
              Upload New Hairstyle
            </h2>
            <div className="w-48 h-48 w-48 h-48 mr-5 object-cover border rounded-md flex items-center justify-center">
              {hairstyleImage ? (
                <img
                  src={URL.createObjectURL(hairstyleImage)}
                  alt="Hairstyle"
                  className="w-full h-48 object-cover rounded-md"
                />
              ) : (
                <FontAwesomeIcon icon={faImage} size="3x" />
              )}
            </div>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                setHairstyleImage(e.target.files[0]);
              }}
              className="w-full"
            />
            <div className="mb-4">
              <input
                type="text"
                placeholder="Description"
                value={hairstyleDescription}
                onChange={(e) => setHairstyleDescription(e.target.value)}
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>
            <button
              type="submit"
              className="w-full px-4 py-2 bg-green-500 text-white rounded-md text-lg hover:bg-green-600 transition duration-300"
            >
              Upload
            </button>
          </form>
        </div>
      )}

      <div className="mt-5">
        <h2 className="text-xl font-bold mb-3">Hairstyles</h2>
        <div className="grid grid-cols-3 gap-4">
          {hairstyles.map((hairstyle, index) => (
            <div key={index} className="flex flex-col">
              <img
                src={hairstyle.image}
                alt={`Hairstyle ${index}`}
                className="w-full h-48 object-cover rounded-md"
              />
              <p className="mt-2">{hairstyle.description}</p>
            </div>
          ))}
        </div>
        <button
          onClick={() => setShowUploadForm(!showUploadForm)}
          className="px-4 py-2 bg-blue-500 text-white rounded-md text-lg mt-3"
        >
          Upload new hairstyle
        </button>
      </div>
      {/* plans */}
      <div className="mt-5">
        <h2 className="text-xl font-bold mb-3">Plans</h2>
        <div className="grid grid-cols-3 gap-4">
          {plans.map((plan, index) => (
            <div key={index} className="flex flex-col">
              <p className="font-bold">Plan Name: {plan.name}</p>
              <p>Price: {plan.price}</p>
              <p>Description{plan.description}</p>
              <p>index: {index}</p>
              <button
                onClick={() => deletePlan(index)}
                className="px-3 py-1 bg-red-500 text-white rounded-md mt-2"
              >
                Delete Plan
              </button>
            </div>
          ))}
        </div>
        {showPlanForm && (
          <form
            onSubmit={createPlan}
            className="fixed top-0 left-0 w-full h-full flex flex-col items-center justify-center bg-gray-800 bg-opacity-50 z-50"
          >
            <FontAwesomeIcon
              icon={faTimes}
              onClick={() => setShowPlanForm(false)}
              className="text-2xl absolute top-3 right-3 cursor-pointer"
            />
            <div className="mb-3">
              <input
                type="text"
                placeholder="Plan Name"
                value={planName}
                onChange={(e) => setPlanName(e.target.value)}
                className="px-3 py-2 border rounded-md"
              />
            </div>
            <div className="mb-3">
              <input
                type="number"
                placeholder="Plan Price"
                value={planPrice}
                onChange={(e) => setPlanPrice(e.target.value)}
                className="px-3 py-2 border rounded-md"
              />
            </div>
            <div className="mb-3">
              <textarea
                placeholder="Plan Description"
                value={planDescription}
                onChange={(e) => setPlanDescription(e.target.value)}
                className="px-3 py-2 border rounded-md"
              />
            </div>
            <button
              type="submit"
              className="px-4 py-2 bg-green-500 text-white rounded-md text-lg"
            >
              confirm
            </button>
          </form>
        )}
        <button
          onClick={() => setShowPlanForm(true)}
          className="px-4 py-2 bg-blue-500 text-white rounded-md text-lg mt-3"
        >
          Create new plan
        </button>
      </div>
    </div>
  );
};

export default SalonProfile;
