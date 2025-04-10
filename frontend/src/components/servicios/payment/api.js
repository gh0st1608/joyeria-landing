import axios from "axios";
import { BASE_URL } from "../endpoints"; // ✅ Importa los endpoints

// ✅ Configura la URL base de la API

const api = axios.create({
  baseURL: BASE_URL.payment,
  headers: { "Content-Type": "application/json" },
  withCredentials: false, // ⚠️ Si usas autenticación, cambia esto a true
});

// ✅ Manejo de errores
const handleApiError = (error, message) => {
  console.error(`❌ ${message}:`, error.response ? error.response.data : error.message);
  return [];
};

// ✅ Función para hacer peticiones POST
export const postRequest = async (endpoint, data) => {
  try {
    const response = await api.post(`${BASE_URL.payment}${endpoint}`, data);
    return response.data;
  } catch (error) {
    return handleApiError(error, `Error posting to ${endpoint}`);
  }
};

export const getRequest = async (endpoint) => {
  try {
    const response = await api.get(`${BASE_URL.payment}${endpoint}`);
    return response.data;
  } catch (error) {
    return handleApiError(error, `Error fetching ${endpoint}`);
  }
};
