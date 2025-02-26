 // Importa correctamente la instancia de Axios
import { ENDPOINTS } from "./endpoints";
import { getRequest, postRequest } from "./api";

// Obtener todos los productos
export const getCategoryProducts = async () => {
  try {
    console.log(`📡 Fetching products from: ${ENDPOINTS.shop.products}`);
    const response = await getRequest(ENDPOINTS.shop.products);
    console.log("✅ Products received:", response.data);
    return response.data;
  } catch (error) {
    console.error("❌ Error fetching products:", error.response ? error.response.data : error.message);
    return [];
  }
};

// Obtener un producto por ID
export const getCategoryProductById = async (id) => {
  try {
    console.log(`📡 Fetching product ID: ${id} from ${ENDPOINTS.shop.getCategoryProductById(id)}`);
    const response = await getRequest(ENDPOINTS.shop.getCategoryProductById(id));
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
    console.log(`📡 Creating category product at: ${ENDPOINTS.shop.createProduct}`);
    const response = await postRequest(ENDPOINTS.shop.createProduct, productData);
    console.log("✅ Product created:", response.data);
    return response.data;
  } catch (error) {
    console.error("❌ Error creating product:", error.response ? error.response.data : error.message);
    return null;
  } 
};*/
