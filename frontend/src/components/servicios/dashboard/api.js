import axios from "axios";

export const handleApiError = (error) => {
  console.error("❌ API Error:", error.response?.data || error.message);
  throw error.response?.data || error;
};

export const getRequest = async (url) => {
  const response = await axios.get(url);
  return response.data;
};

export const postRequest = async (url, data) => {
  try {
    const response = await axios.post(url, data, {
      headers: { "Content-Type": "application/json" }
    });
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const putRequest = async (url, data) => {
  try {
    const response = await axios.put(url, data, {
      headers: { "Content-Type": "application/json" }
    });
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const deleteRequest = async (url) => {
  try {
    const response = await axios.delete(url);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};
