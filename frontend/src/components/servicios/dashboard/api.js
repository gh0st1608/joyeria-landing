import axios from "axios";
import { BASE_URL } from "../../servicios/endpoints"; // Asegúrate que la ruta sea correcta

// Manejo centralizado de errores
export const handleApiError = (error) => {
  console.error("❌ API Error:", error.response?.data || error.message);
  throw error.response?.data || error;
};

// GET: base = BASE_URL.shop, url = /products
export const getRequest = async (base, url) => {
  try {
    const response = await axios.get(`${base}${url}`);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

// POST
export const postRequest = async (base, url, data) => {
  try {
    const response = await axios.post(`${base}${url}`, data, {
      headers: { "Content-Type": "application/json" }
    });
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

// PUT
export const putRequest = async (base, url, data) => {
  try {
    const response = await axios.put(`${base}${url}`, data, {
      headers: { "Content-Type": "application/json" }
    });
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

// DELETE
export const deleteRequest = async (base, url) => {
  try {
    const response = await axios.delete(`${base}${url}`);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};
