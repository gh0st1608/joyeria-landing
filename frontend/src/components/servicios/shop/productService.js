 // Importa correctamente la instancia de Axios
 import { getRequest, postRequest } from "./api";
import { ENDPOINTS } from "../endpoints";

// Obtener todos los productos
export const getProducts = async () => {
  try {
    console.log(`📡 Fetching products from: ${ENDPOINTS.shop.products}`);
    const response = await getRequest(ENDPOINTS.shop.products);
    console.log("✅ Products received:", response);
    return response;
  } catch (error) {
    console.error("❌ Error fetching products:", error.response ? error.response.data : error.message);
    return [];
  }
};

// Obtener un producto por ID
export const getProductById = async (id) => {
  try {
    console.log(`📡 Fetching product ID: ${id} from ${ENDPOINTS.shop.getProductById(id)}`);
    const response = await getRequest(ENDPOINTS.shop.getProductById(id));
    console.log("✅ Product received:", response.data);
    return response.data;
  } catch (error) {
    console.error(`❌ Error fetching product ${id}:`, error.response ? error.response.data : error.message);
    return null;
  }
};

// ✅ Crear un nuevo producto
/* export const createProduct = async (productData) => {
  try {
    console.log(`📡 Creating product at: ${ENDPOINTS.shop.createProduct}`);
    const response = await api.post(ENDPOINTS.shop.createProduct, productData);
    console.log("✅ Product created:", response.data);
    return response.data;
  } catch (error) {
    console.error("❌ Error creating product:", error.response ? error.response.data : error.message);
    return null;
  }
}; */
