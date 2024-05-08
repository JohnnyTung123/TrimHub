const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8080";

export const fetchSalonInfo = async (userId) => {
  try {
    const response = await fetch(`${API_URL}/salon-info?userId=${userId}`);
    if (!response.ok) {
      throw new Error("Error fetching salon info");
    }
    const salon = await response.json();
    return salon;
  } catch (error) {
    console.error(error);
  }
};

export const fetchSalonImages = async (salonId) => {
  try {
    const response = await fetch(
      `${API_URL}/salon-info/image?salonId=${salonId}`
    );
    if (response.status === 404) {
      return null;
    }
    if (!response.ok) {
      throw new Error("Error fetching salon images");
    }
    console.log("Got Salon Image:", response);
    const image = await response.blob();
    return image;
  } catch (error) {
    console.error(error);
  }
};

export const fetchHairstyles = async (salonId) => {
  try {
    const response = await fetch(`${API_URL}/hairstyle?salonId=${salonId}`);
    if (!response.ok) {
      throw new Error("Error fetching hairstyles");
    }
    const hairstyles = await response.json();
    return hairstyles;
  } catch (error) {
    console.error(error);
  }
};

export const fetchPlans = async (salonId) => {
  try {
    const response = await fetch(`${API_URL}/plan?salonId=${salonId}`);
    if (!response.ok) {
      throw new Error("Error fetching plan");
    }
    const plans = await response.json();
    return plans;
  } catch (error) {
    console.error(error);
  }
};

const uploadSalonImage = async (salonId, newSalonImage) => {
  const formData = new FormData();
  formData.append("salon-image", newSalonImage);

  try {
    const response = await fetch(`${API_URL}/salon-info/image/${salonId}`, {
      method: "PUT",
      body: formData,
    });
    if (!response.ok) {
      throw Error("Cannot upload salon image.");
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const changeSalonInfoAPI = async (
  salonId,
  salonName,
  address,
  newSalonImage
) => {
  try {
    // Upload salon image first if there is a new image
    if (newSalonImage) {
      await uploadSalonImage(salonId, newSalonImage);
    }

    const response = await fetch(`${API_URL}/salon-info/${salonId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        salonname: salonName,
        address: address,
      }),
    });
    if (!response.ok) {
      throw Error("Cannot update salon information.");
    }
    return "Salon information updated successfully.";
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const createHairstyleAPI = async (
  salonId,
  hairstyleImage,
  hairstyleDescription
) => {
  const formData = new FormData();
  formData.append("salonId", salonId);
  formData.append("hairstyle-image", hairstyleImage);
  formData.append("description", hairstyleDescription);

  try {
    const response = await fetch(`${API_URL}/hairstyle`, {
      method: "POST",
      body: formData,
    });
    if (!response.ok) {
      throw new Error("Failed to add hairstyle.");
    }
    const hairstyle = await response.json();
    return hairstyle;
  } catch (error) {
    console.error("Error adding hairstyle:", error);
    throw error;
  }
};

export const deleteHairstyleAPI = async (hairstyleId) => {
  try {
    const response = await fetch(`${API_URL}/hairstyle/${hairstyleId}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error("Failed to delete hairstyle.");
    }
  } catch (error) {
    console.error("Error deleting hairstyle:", error);
    throw error;
  }
};

export const createPlanAPI = async (
  salonId,
  planName,
  planPrice,
  planDescription
) => {
  try {
    const response = await fetch(`${API_URL}/plan/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        salonId: salonId,
        name: planName,
        price: planPrice,
        description: planDescription,
      }),
    });
    if (!response.ok) {
      throw new Error("Error creating plan");
    }
    const plan = await response.json();
    return plan;
  } catch (error) {
    console.error(error);
  }
};

export const deletePlanAPI = async (planId) => {
  try {
    const response = await fetch(`${API_URL}/plan/${planId}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error("Error deleting plan");
    }
  } catch (error) {
    console.error(error);
  }
};

export const updatePlanAPI = async (plan) => {
  try {
    const response = await fetch(`${API_URL}/plan/${plan._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: plan.name,
        price: plan.price,
        description: plan.description,
      }),
    });
    if (!response.ok) {
      throw new Error("Error updating plan");
    }
  } catch (error) {
    console.error(error);
  }
};
