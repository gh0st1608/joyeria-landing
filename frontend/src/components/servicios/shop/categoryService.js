 // Importa correctamente la instancia de Axios
import { ENDPOINTS } from "../endpoints";
import { getRequest } from "./api";

// Obtener todos los productos
export const getCategoryProducts = async () => {
  try {
    const response = await getRequest(ENDPOINTS.shop.categoryProducts);
    return response;
  } catch (error) {
    console.error("❌ Error obteniendo lista de categorias productos:", error.response ? error.response.data : error.message);
    return [];
  }
};

// Obtener un producto por ID
export const getCategoryProductById = async (_id) => {
  try {
    const response = await getRequest(ENDPOINTS.shop.getCategoryProductById(_id));
    return response.data;
  } catch (error) {
    console.error(`❌ Error fetching product ${_id}:`, error.response ? error.response.data : error.message);
    return null;
  }
};


