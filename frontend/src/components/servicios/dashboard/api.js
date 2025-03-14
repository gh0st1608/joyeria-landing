import axios from "axios";
import { BASE_URL } from "../endpoints"; // ✅ Importa los endpoints

// ✅ Configura la URL base de la API para el dashboard
const dashboardApi = axios.create({
  baseURL: BASE_URL.dashboard, 
  headers: { "Content-Type": "application/json" },
  withCredentials: false, // Si usas autenticación, cambia esto a true
});

// ✅ Manejo de errores
const handleApiError = (error, message) => {
  console.error(`❌ ${message}:`, error.response ? error.response.data : error.message);
  throw error.response ? error.response.data : new Error(error.message);
};

// ✅ Función para hacer peticiones GET
export const getDashboardData = async (endpoint) => {
  try {
    console.log(`📡 Fetching data from: ${BASE_URL.dashboard}${endpoint}`);
    const response = await dashboardApi.get(endpoint);
    console.log("✅ Data received:", response.data);
    return response.data;
  } catch (error) {
    return handleApiError(error, `Error fetching ${endpoint}`);
  }
};

// ✅ Función para hacer peticiones POST
export const postDashboardData = async (endpoint, data) => {
  try {
    console.log(`📡 Sending data to: ${BASE_URL.dashboard}${endpoint}`, data);
    const response = await dashboardApi.post(endpoint, data);
    console.log("✅ Data successfully posted:", response.data);
    return response.data;
  } catch (error) {
    return handleApiError(error, `Error posting to ${endpoint}`);
  }
};

// ✅ Función para hacer peticiones PUT (Actualizar)
export const putDashboardData = async (endpoint, data) => {
  try {
    console.log(`📡 Updating data at: ${BASE_URL.dashboard}${endpoint}`, data);
    const response = await dashboardApi.put(endpoint, data);
    console.log("✅ Data successfully updated:", response.data);
    return response.data;
  } catch (error) {
    return handleApiError(error, `Error updating ${endpoint}`);
  }
};

// ✅ Función para hacer peticiones DELETE
export const deleteDashboardData = async (endpoint) => {
  try {
    console.log(`📡 Deleting data at: ${BASE_URL.dashboard}${endpoint}`);
    const response = await dashboardApi.delete(endpoint);
    console.log("✅ Data successfully deleted:", response.data);
    return response.data;
  } catch (error) {
    return handleApiError(error, `Error deleting ${endpoint}`);
  }
};
