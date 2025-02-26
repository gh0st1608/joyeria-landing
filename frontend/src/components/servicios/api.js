import axios from "axios";
import ENDPOINTS from "./endpoints"; // ✅ Importa los endpoints

// ✅ Configura la URL base de la API
const BASE_URL = "https://msa-joyasperu-shop-1094025365695.us-east1.run.app/";

const api = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: false, // ⚠️ Si usas autenticación, cambia esto a true
});

// ✅ Manejo de errores
const handleApiError = (error, message) => {
  console.error(`❌ ${message}:`, error.response ? error.response.data : error.message);
  return [];
};

// ✅ Función para hacer peticiones GET
export const getRequest = async (endpoint) => {
  try {
    console.log(`📡 Fetching data from: ${BASE_URL}${endpoint}`);
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
    console.log(`📡 Sending data to: ${BASE_URL}${endpoint}`, data);
    const response = await api.post(endpoint, data);
    console.log("✅ Data successfully posted:", response.data);
    return response.data;
  } catch (error) {
    return handleApiError(error, `Error posting to ${endpoint}`);
  }
};

export default api;
