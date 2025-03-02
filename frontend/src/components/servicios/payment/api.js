import axios from "axios";
import { BASE_URL } from "../endpoints"; // ✅ Importa los endpoints

// ✅ Configura la URL base de la API

const api = axios.create({
  baseURL: BASE_URL.paymentauth,
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
    console.log('BASE_URL.payment',BASE_URL.payment)
    console.log('endpoint',endpoint)
    console.log(`📡 Sending data to: ${BASE_URL.payment}${endpoint}`, data);
    const response = await api.post(`${BASE_URL.payment}${endpoint}`, data);
    console.log("✅ Data successfully posted:", response.data);
    return response.data;
  } catch (error) {
    return handleApiError(error, `Error posting to ${endpoint}`);
  }
};
