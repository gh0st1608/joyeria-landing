import axios from "axios";
import { BASE_URL } from "../endpoints"; // ✅ Importa los endpoints

// ✅ Configura la URL base de la API
const api = axios.create({
  baseURL: BASE_URL.shop, 
  headers: { "Content-Type": "application/json" },
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
    console.log(`📡 Fetching data from: ${BASE_URL.shop}${endpoint}`);
    const response = await api.get(endpoint);
    console.log("✅ Data received:", response.data);
    return response.data;
  } catch (error) {
    return handleApiError(error, `Error fetching ${endpoint}`);
  }
};

// ✅ Función para hacer peticiones POST
export const postRequest = async (endpoint, data) => {
  try {
    console.log(`📡 Sending data to: ${BASE_URL.shop}${endpoint}`, data);
    const response = await api.post(endpoint, data);
    console.log("✅ Data successfully posted:", response.data);
    return response.data;
  } catch (error) {
    return handleApiError(error, `Error posting to ${endpoint}`);
  }
};

// ✅ Función para hacer peticiones PUT (Actualizar)
export const putRequest = async (endpoint, data) => {
  try {
    console.log(`📡 Updating data at: ${BASE_URL.shop}${endpoint}`, data);
    const response = await api.put(endpoint, data);
    console.log("✅ Data successfully updated:", response.data);
    return response.data;
  } catch (error) {
    return handleApiError(error, `Error updating ${endpoint}`);
  }
};

// ✅ Función para hacer peticiones DELETE
export const deleteRequest = async (endpoint) => {
  try {
    console.log(`📡 Deleting data at: ${BASE_URL.shop}${endpoint}`);
    const response = await api.delete(endpoint);
    console.log("✅ Data successfully deleted:", response.data);
    return response.data;
  } catch (error) {
    return handleApiError(error, `Error deleting ${endpoint}`);
  }
};
