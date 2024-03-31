const API_URL = "http://localhost:8080";

export const fetchSalonInfo = async (username) => {
  try {
    const response = await fetch(`${API_URL}/salon-info?username=${username}`);
    if (!response.ok) {
      throw new Error("Error fetching salon info");
    }
    const salon = await response.json();
    return salon;
  } catch (error) {
    console.error(error);
  }
};

export const fetchSalonImages = async (username) => {
  try {
    const response = await fetch(
      `${API_URL}/salon-info/image?username=${username}`
    );
    if (response.status === 404) {
      return null;
    }
    if (!response.ok) {
      throw new Error("Error fetching salon images");
    }
    const data = await response.blob();
    return URL.createObjectURL(data);
  } catch (error) {
    console.error(error);
  }
};

export const changeSalonInfo = async (
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

export const createHairstyle = async (salonId, data) => {
  try {
    const response = await fetch(`${API_URL}/salon/${salonId}/hairstyles`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error("Error creating hairstyle");
    }
  } catch (error) {
    console.error(error);
  }
};

export const createNewPlan = async (salonId, data) => {
  try {
    const response = await fetch(`${API_URL}/salon/${salonId}/plans`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error("Error creating plan");
    }
  } catch (error) {
    console.error(error);
  }
};

export const deletePlan = async (salonId) => {
  try {
    const response = await fetch(`${API_URL}/salon/${salonId}/plans`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error("Error deleting plan");
    }
  } catch (error) {
    console.error(error);
  }
};
