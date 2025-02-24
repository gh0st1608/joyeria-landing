import axios from "axios";
import ENDPOINTS from "./endpoints"; // ✅ Importa las rutas de la API

// ✅ Configura la URL base de la API
// const BASE_URL = "http://127.0.0.1:8000/api/";
const BASE_URL= "https://msa-joyasperu-shop-1094025365695.us-east1.run.app/shop";

const api = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: false, // ⚠️ Desactiva credenciales si no usas autenticación
});

// ✅ Manejo de errores
const handleApiError = (error, message) => {
  console.error(`❌ ${message}:`, error.response ? error.response.data : error.message);
  return [];
};

// ✅ Obtener todos los productos
export const getProducts = async () => {
  try {
    const response = await api.get(ENDPOINTS.productos);
    console.log("📢 Productos obtenidos en React:", response.data);
    return response.data; // ✅ Retorna los productos obtenidos
  } catch (error) {
    return handleApiError(error, "Error obteniendo productos");
  }
};

// ✅ Obtener un producto por ID
export const getProductById = async (id) => {
  try {
    const response = await api.get(`${ENDPOINTS.productos}${id}/`);
    return response.data; // ✅ Retorna el producto obtenido
  } catch (error) {
    console.error(`❌ Error obteniendo el producto con ID ${id}:`, error.response ? error.response.data : error.message);
    return null;
  }
};

export default api;
