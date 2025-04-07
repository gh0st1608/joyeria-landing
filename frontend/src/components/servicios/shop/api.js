import axios from "axios";
import { BASE_URL } from "../endpoints"; // ✅ Importa los endpoints

// ✅ Configura la URL base de la API
const api = axios.create({
  baseURL: BASE_URL.shop, 
  headers: { "Content-Type": "multipart/form-data" },
  withCredentials: false, // Si usas autenticación, cambia esto a true
});

// ✅ Manejo de errores
const handleApiError = (error, message) => {
  console.error(`❌ ${message}:`, error.response ? error.response.data : error.message);
  throw error.response ? error.response.data : new Error(error.message);
};

// ✅ Función para hacer peticiones GET
export const getRequest = async (endpoint) => {
  try {
    const response = await api.get(endpoint);
    return response.data;
  } catch (error) {
    return handleApiError(error, `Error fetching ${endpoint}`);
  }
};

// ✅ Función para hacer peticiones POST
export const postRequest = async (endpoint, data) => {
  try {
    const response = await api.post(endpoint, data);
    return response.data;
  } catch (error) {
    return handleApiError(error, `Error posting to ${endpoint}`);
  }
};

// ✅ Función para hacer peticiones PUT (Actualizar)
export const putRequest = async (endpoint, data) => {
  try {
    const response = await api.put(endpoint, data);
    return response.data;
  } catch (error) {
    return handleApiError(error, `Error updating ${endpoint}`);
  }
};

// ✅ Función para hacer peticiones DELETE
export const deleteRequest = async (endpoint) => {
  try {
    const response = await api.delete(endpoint);
    return response.data;
  } catch (error) {
    return handleApiError(error, `Error deleting ${endpoint}`);
  }
};