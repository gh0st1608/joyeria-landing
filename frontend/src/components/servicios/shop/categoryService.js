 // Importa correctamente la instancia de Axios
import { ENDPOINTS } from "../endpoints";
import { getRequest } from "./api";

// Obtener todos los productos
export const getCategoryProducts = async () => {
  try {
    console.log(`📡 Fetching products from: ${ENDPOINTS.shop.categoryProducts}`);
    const response = await getRequest(ENDPOINTS.shop.categoryProducts);
    console.log("✅ Lista Categoria de productos recibidos:", response);
    return response;
  } catch (error) {
    console.error("❌ Error obteniendo lista de categorias productos:", error.response ? error.response.data : error.message);
    return [];
  }
};

// Obtener un producto por ID
export const getCategoryProductById = async (_id) => {
  try {
    console.log(`📡 Fetching product ID: ${_id} from ${ENDPOINTS.shop.getCategoryProductById(_id)}`);
    const response = await getRequest(ENDPOINTS.shop.getCategoryProductById(_id));
    console.log("✅ Categoria de Producto recibida:", response);
    return response.data;
  } catch (error) {
    console.error(`❌ Error fetching product ${_id}:`, error.response ? error.response.data : error.message);
    return null;
  }
};


