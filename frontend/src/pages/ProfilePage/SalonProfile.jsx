import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage, faTimes } from "@fortawesome/free-solid-svg-icons";
import {
  fetchSalonInfo,
  fetchSalonImages,
  fetchHairstyles,
  fetchPlans,
  changeSalonInfoAPI,
  createHairstyleAPI,
  deleteHairstyleAPI,
  createPlanAPI,
  deletePlanAPI,
  updatePlanAPI,
} from "./SalonApi";

const SalonProfile = ({ user }) => {
  // salon information
  const [salonId, setSalonId] = useState("");
  const [salonName, setSalonName] = useState("");
  const [address, setAddress] = useState("");
  const [salonImage, setSalonImage] = useState(null);
  const [newSalonImage, setNewSalonImage] = useState(null);

  // hairstyle image
  const [showUploadForm, setShowUploadForm] = useState(false);
  const [hairstyles, setHairstyles] = useState([]);
  const [hairstyleImage, setHairstyleImage] = useState(null);
  const [hairstyleDescription, setHairstyleDescription] = useState("");

  // salon plan
  const [showPlanForm, setShowPlanForm] = useState(false);
  const [plans, setPlans] = useState([]);
  const [planName, setPlanName] = useState("");
  const [planPrice, setPlanPrice] = useState("");
  const [planDescription, setPlanDescription] = useState("");

  // 1. fetch information from backend
  useEffect(() => {
    const fetchSalonData = async () => {
      const salonInfo = await fetchSalonInfo(user._id);
      setSalonId(salonInfo._id);
      setSalonName(salonInfo.salonname);
      setAddress(salonInfo.address || "");

      const salonImageData = await fetchSalonImages(salonInfo._id);
      setSalonImage(salonImageData);

      const hairstylesData = await fetchHairstyles(salonInfo._id);
      setHairstyles(hairstylesData);

      const plans = await fetchPlans(salonInfo._id);
      setPlans(plans);
    };
    fetchSalonData();
  }, [user]);

  // 2. change salon information, including salon name and address
  const changeSalonInfo = async (e) => {
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
      await changeSalonInfoAPI(salonId, salonName, address, newSalonImage);
      alert("Salon information updated successfully.");
    } catch (error) {
      console.error(error);
    }
  };

  // 3. create new haircut
  const createHairstyle = async (e) => {
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
      await createHairstyleAPI(salonId, formData);
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
  const deleteHairstyle = async (index) => {
    try {
      await deleteHairstyleAPI(salonId, index);
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
      const plan = await createPlanAPI(salonId, planName, planPrice, planDescription);
      setPlans([...plans, plan]);
      setPlanName("");
      setPlanPrice("");
      setPlanDescription("");
      setShowPlanForm(false);
    } catch (error) {
      console.error(error);
    }
  };

  // 6. delete plan
  const deletePlan = async (planId) => {
    try {
      await deletePlanAPI(planId);
      setPlans((plans) => plans.filter((plan) => plan._id !== planId));
    } catch (error) {
      console.error(error);
    }
  };

  // 7. update plan
  const updatePlan = async (plan) => {
    try {
      console.log("Going to update plan:", plan);
      await updatePlanAPI(plan);
      alert("Plan updated successfully.");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="p-8 bg-gray-200 min-h-screen h-full">
      {/* Salon Profile */}
      <h2 className="text-2xl font-bold mb-4 flex items-center">
        <span className="w-2 h-6 bg-green-700 mr-2"></span>
        Salon Management
      </h2>
      <div className="flex items-center mb-5">
        {newSalonImage ? (
          <img
            src={URL.createObjectURL(newSalonImage)}
            className="w-48 h-48 object-cover border rounded-md"
            alt="Salon"
          />
        ) : salonImage ? (
          <img
            src={URL.createObjectURL(salonImage)}
            className="w-48 h-48 object-cover border rounded-md"
            alt="Salon"
          />
        ) : (
          <FontAwesomeIcon icon={faImage} size="3x" className="mr-5" />
        )}
        <table className="table-fixed border border-black w-full mx-5">
          <tbody>
            <tr>
              <td className="border border-black w-32 px-4 py-2 font-bold">Salon Name</td>
              <td className="border border-black px-4 py-2">
                <input
                  type="text"
                  id="salonName"
                  value={salonName}
                  onChange={(e) => setSalonName(e.target.value)}
                  className="w-full px-3 py-2 border rounded-md"
                />
              </td>
            </tr>
            <tr>
              <td className="border border-black w-32 px-4 py-2 font-bold">Address</td>
              <td className="border border-black px-4 py-2">
                <input
                  type="text"
                  id="address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full px-3 py-2 border rounded-md"
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setNewSalonImage(e.target.files[0])}
          className="mb-3"
        />
        <button
          onClick={changeSalonInfo}
          className="px-4 py-2 bg-green-700 text-white rounded-md text-lg"
        >
          Change salon information
        </button>
      </div>

      {/* hairstyle */}
      {showUploadForm && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
          <form
            onSubmit={createHairstyle}
            className="bg-white p-10 rounded-md shadow-lg"
          >
            <FontAwesomeIcon
              icon={faTimes}
              onClick={() => setShowUploadForm(false)}
              className="text-2xl absolute top-3 right-3 cursor-pointer"
            />
            <h2 className="text-2xl font-bold mb-4 flex items-center">
              <span className="w-2 h-6 bg-green-700 mr-2"></span>
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
              onChange={(e) => setHairstyleImage(e.target.files[0])}
              className="w-full"
            />
            <div className="mb-4">
              <input
                type="text"
                placeholder="Description"
                value={hairstyleDescription}
                onChange={(e) => setHairstyleDescription(e.target.value)}
                className="w-full px-3 py-2 border rounded-md mt-3"
              />
            </div>
            <button
              type="submit"
              className="w-full px-4 py-2 bg-green-700 text-white hover:opacity-80 cursor-pointer"
            >
              Upload
            </button>
          </form>
        </div>
      )}
      <div className="mt-5">
        <div className="flex items-center">
          <h2 className="text-xl font-bold mr-2">Hairstyles</h2>
          <button
            onClick={() => setShowUploadForm(!showUploadForm)}
            className="px-4 py-2 bg-blue-500 text-white rounded-md text-lg m-2"
          >
            Upload new hairstyle
          </button>
        </div>
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
                onClick={() => deleteHairstyle(index)}
                className="px-3 py-1 bg-red-500 text-white rounded-md mt-2"
              >
                Delete Hairstyle
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Plans */}
      {showPlanForm && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <form
            onSubmit={createPlan}
            className="bg-white p-10 rounded-md shadow-lg w-1/4"
          >
            <FontAwesomeIcon
              icon={faTimes}
              onClick={() => setShowPlanForm(false)}
              className="text-2xl absolute top-3 right-3 cursor-pointer"
            />
            <h2 className="text-2xl font-bold mb-4 flex items-center">
              <span className="w-2 h-6 bg-green-700 mr-2"></span>
              Create Plan
            </h2>
            <div className="mb-4">
              <label htmlFor="planName" className="block mb-1 font-bold">
                Name
              </label>
              <input
                type="text"
                placeholder="Plan Name"
                value={planName}
                onChange={(e) => setPlanName(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="planPrice" className="block mb-1 font-bold">
                Price
              </label>
              <input
                type="number"
                placeholder="Plan Price"
                value={planPrice}
                onChange={(e) => setPlanPrice(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="planDescription" className="block mb-1 font-bold">
                Description
              </label>
              <textarea
                placeholder="Plan Description"
                value={planDescription}
                onChange={(e) => setPlanDescription(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <button
              type="submit"
              className="w-full px-4 py-2 bg-green-700 text-white hover:opacity-80 cursor-pointer"
            >
              Confirm
            </button>
          </form>
        </div>
      )}
      <div className="mt-5">
        <div className="flex items-center">
          <h2 className="text-xl font-bold mr-2">Plans</h2>
          <button
            onClick={() => setShowPlanForm(true)}
            className="px-4 py-2 bg-blue-500 text-white rounded-md text-lg m-2"
          >
            Create new plan
          </button>
        </div>
        <div className="grid grid-cols-3 gap-4">
          {plans.map((plan, index) => (
            <div key={index} className="mb-4">
              <table className="table-fixed border border-black w-full">
                <tbody>
                  <tr>
                    <td className="border border-black w-32 px-4 py-2 font-bold">Plan Name</td>
                    <td className="border border-black px-4 py-2">
                      <input
                        type="text"
                        value={plan.name}
                        className="border rounded-md w-full"
                        onChange={(e) => {
                          const updatedPlans = [...plans];
                          updatedPlans[index].name = e.target.value;
                          setPlans(updatedPlans);
                        }}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-black w-32 px-4 py-2 font-bold">Price</td>
                    <td className="border border-black px-4 py-2">
                      <input
                        type="number"
                        value={plan.price}
                        className="border rounded-md w-full"
                        onChange={(e) => {
                          const updatedPlans = [...plans];
                          updatedPlans[index].price = e.target.value;
                          setPlans(updatedPlans);
                        }}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-black w-32 px-4 py-2 font-bold">Description</td>
                    <td className="border border-black px-4 py-2">
                      <textarea
                        value={plan.description}
                        className="border rounded-md w-full"
                        onChange={(e) => {
                          const updatedPlans = [...plans];
                          updatedPlans[index].description = e.target.value;
                          setPlans(updatedPlans);
                        }}
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
              <button
                onClick={() => updatePlan(plan)}
                className="px-3 py-1 bg-blue-500 text-white rounded-md m-2"
              >
                Confirm Changes
              </button>
              <button
                onClick={() => deletePlan(plan._id)}
                className="px-3 py-1 bg-red-500 text-white rounded-md m-2"
              >
                Delete Plan
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SalonProfile;
