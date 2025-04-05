import axios from "axios";
import { BASE_URL } from "../endpoints"; // 📌 Importamos los endpoints

// ✅ Crear instancia de Axios para ContactUs
const contactApi = axios.create({
  baseURL: BASE_URL.notification, // 📌 Apunta a la URL de notificación
  headers: { "Content-Type": "application/json" },
});

// ✅ Manejo de errores
const handleApiError = (error, message) => {
  console.error(`❌ ${message}:`, error.response ? error.response.data : error.message);
  return null;
};

// ✅ Función para hacer peticiones POST (enviar mensajes de contacto)
export const postRequest = async (endpoint, data) => {
  try {
    const response = await contactApi.post(endpoint, data);
    return response.data;
  } catch (error) {
    return handleApiError(error, `Error posting to ${endpoint}`);
  }
};

export default contactApi;
