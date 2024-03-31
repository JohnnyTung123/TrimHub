import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage, faTimes } from "@fortawesome/free-solid-svg-icons";
import {
  fetchSalonInfo,
  fetchSalonImages,
  fetchHairstyles,
  changeSalonInfo,
  createHairstyle,
  deleteHairstyle,
  createNewPlan,
  deletePlan,
  updatePlanInfo,
} from "./SalonApi";

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

  useEffect(() => {
    const fetchSalonData = async () => {
      const salonInfoData = await fetchSalonInfo(user.username);
      setSalonId(salonInfoData._id);
      setSalonName(salonInfoData.salonname);
      setAddress(salonInfoData.address || "");
      setPlans(salonInfoData.plans || []);

      const salonImageData = await fetchSalonImages(user.username);
      setSalonImage(salonImageData);

      const hairstylesData = await fetchHairstyles(user.username);
      console.log("Hairstyles:", hairstylesData);
      setHairstyles(hairstylesData);
    };
    fetchSalonData();
  }, [user.username]);

  // 1. change salon information, including salon name and address
  const changeSalonInformation = async (e) => {
    e.preventDefault();
    if (!salonName) {
      alert("Please enter a salon name.");
      return;
    }
    if (!address) {
      alert("Please enter an address.");
      return;
    }

    try {
      await changeSalonInfo(salonId, salonName, address, newSalonImage);
      alert("Salon information updated successfully.");
    } catch (error) {
      console.error(error);
    }
  };

  // 3. create new haircut
  const createHaircut = async (e) => {
    e.preventDefault();
    if (!hairstyleImage) {
      alert("Please upload a hairstyle image.");
      return;
    }
    if (!hairstyleDescription) {
      alert("Please enter a hairstyle description.");
      return;
    }

    const formData = new FormData();
    formData.append("hairstyle-image", hairstyleImage);
    formData.append("description", hairstyleDescription);

    try {
      await createHairstyle(salonId, formData);
      setHairstyles([
        ...hairstyles,
        {
          image: URL.createObjectURL(hairstyleImage),
          description: hairstyleDescription,
        },
      ]);
      setHairstyleImage(null);
      setHairstyleDescription("");
      setShowUploadForm(false);
    } catch (error) {
      console.error(error);
    }
  };

  // 4. delete haircut
  const removeHairstyle = async (index) => {
    try {
      await deleteHairstyle(salonId, index);
      const updatedHairstyles = [...hairstyles];
      updatedHairstyles.splice(index, 1);
      setHairstyles(updatedHairstyles);
    } catch (error) {
      console.error(error);
    }
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
      await createNewPlan(salonId, {
        name: planName,
        price: planPrice,
        description: planDescription,
      });
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
      setShowPlanForm(false);
    } catch (error) {
      console.error(error);
    }
  };

  // 6. delete plan
  const removePlan = async (index) => {
    try {
      await deletePlan(salonId, index);
      const updatedPlans = [...plans];
      updatedPlans.splice(index, 1);
      setPlans(updatedPlans);
    } catch (error) {
      console.error(error);
    }
  };

  // 7. update plan
  const updatePlan = async (index, plan) => {
    try {
      console.log("Updating plan:", index, plan);
      await updatePlanInfo(salonId, {
        index,
        name: plan.name,
        price: plan.price,
        description: plan.description,
      });
      alert("Plan updated successfully.");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="p-5 font-sans">
      {/* Salon Profile */}
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
      <form onSubmit={changeSalonInformation} className="mb-5">
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
      {/* hairstyle */}
      {showUploadForm && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
          <form
            onSubmit={createHaircut}
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
              <p>{hairstyle.imagePath}</p>
              <img
                src={hairstyle.imagePath}
                alt={`Hairstyle ${index}`}
                className="w-full h-48 object-cover rounded-md"
              />
              <p className="mt-2">{hairstyle.description}</p>
              {/* delete hairstyle */}
              <button
                onClick={() => removeHairstyle(index)}
                className="px-3 py-1 bg-red-500 text-white rounded-md mt-2"
              >
                Delete Hairstyle
              </button>
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
      {/* Plans */}
      <div className="mt-5">
        <h2 className="text-xl font-bold mb-3">Plans</h2>
        <div className="grid grid-cols-3 gap-4">
          {plans.map((plan, index) => (
            <div key={index} className="flex flex-col">
              <input
                type="text"
                value={plan.name}
                className="border rounded-md"
                onChange={(e) => {
                  const updatedPlans = [...plans];
                  updatedPlans[index].name = e.target.value;
                  setPlans(updatedPlans);
                }}
              />
              <input
                type="number"
                value={plan.price}
                className="border rounded-md"
                onChange={(e) => {
                  const updatedPlans = [...plans];
                  updatedPlans[index].price = e.target.value;
                  setPlans(updatedPlans);
                }}
              />
              <textarea
                value={plan.description}
                className="border rounded-md"
                onChange={(e) => {
                  const updatedPlans = [...plans];
                  updatedPlans[index].description = e.target.value;
                  setPlans(updatedPlans);
                }}
              />
              <p className="mt-2">{index}</p>
              <button
                onClick={() => updatePlan(index, plan)}
                className="px-3 py-1 bg-blue-500 text-white rounded-md mt-2"
              >
                confirm changes
              </button>
              <button
                onClick={() => removePlan(index)}
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
