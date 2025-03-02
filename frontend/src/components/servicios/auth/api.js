import axios from "axios";
import { BASE_URL } from "../endpoints"; // ✅ Importa los endpoints

// ✅ Configura la URL base de la API

const api = axios.create({
  baseURL: BASE_URL.auth,
  headers: { "Content-Type": "application/json" },
  withCredentials: true, // ⚠️ Si usas autenticación, cambia esto a true
});

// ✅ Manejo de errores
const handleApiError = (error, message) => {
  console.error(`❌ ${message}:`, error.response ? error.response.data : error.message);
  return [];
};

// ✅ Función para hacer peticiones GET
/* export const getRequest = async (endpoint) => {
  try {
    console.log(`📡 Fetching data from: ${BASE_URL_AUTH}${endpoint}`);
    const response = await api.get(endpoint);
    console.log("✅ Data received:", response.data);
    return response.data;
  } catch (error) {
    return handleApiError(error, `Error fetching ${endpoint}`);
  }
}; */

// ✅ Función para hacer peticiones POST
export const postRequest = async (endpoint, data) => {
  try {
    console.log('BASE_URL.auth',BASE_URL.auth)
    console.log('endpoint',endpoint)
    console.log(`📡 Sending data to: ${BASE_URL.auth}${endpoint}`, data);
    const response = await api.post(`${BASE_URL.auth}${endpoint}`, data);
    console.log("✅ Data successfully posted:", response.data);
    return response.data;
  } catch (error) {
    return handleApiError(error, `Error posting to ${endpoint}`);
  }
};
