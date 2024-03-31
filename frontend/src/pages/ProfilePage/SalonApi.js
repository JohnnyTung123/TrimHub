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
    console.log("Got Salon Image:", response);
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

export const createHairstyle = async (salonId, formData) => {
  try {
    const response = await fetch(
      `${API_URL}/salon-info/hairstyles/${salonId}`,
      {
        method: "PUT",
        body: formData,
      }
    );
    if (!response.ok) {
      throw new Error("Failed to add hairstyle.");
    }
    // Handle success
  } catch (error) {
    console.error("Error adding hairstyle:", error);
    throw error;
  }
};

export const deleteHairstyle = async (salonId, hairstyleId) => {
  try {
    const response = await fetch(
      `${API_URL}/salon-info/hairstyles/${salonId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ index: hairstyleId }),
      }
    );
    if (!response.ok) {
      throw new Error("Failed to delete hairstyle.");
    }
  } catch (error) {
    console.error("Error deleting hairstyle:", error);
    throw error;
  }
};

export const fetchHairstyles = async (username) => {
  try {
    const response = await fetch(
      `${API_URL}/salon-info/hairstyles?username=${username}`
    );
    if (!response.ok) {
      throw new Error("Error fetching hairstyles");
    }
    const hairstyles = await response.json();
    return hairstyles;
  } catch (error) {
    console.error(error);
  }
};
export const createNewPlan = async (salonId, data) => {
  try {
    const response = await fetch(`${API_URL}/salon-info/plans/${salonId}`, {
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

export const deletePlan = async (salonId, index) => {
  try {
    const response = await fetch(`${API_URL}/salon-info/plans/${salonId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ index }),
    });
    if (!response.ok) {
      throw new Error("Error deleting plan");
    }
  } catch (error) {
    console.error(error);
  }
};

export const updatePlanInfo = async (salonId, data) => {
  console.log("Updating plan info:", data);
  try {
    const response = await fetch(`${API_URL}/salon-info/plans/${salonId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error("Error updating plan");
    }
  } catch (error) {
    console.error(error);
  }
};
