import { postRequest, getRequest } from "./api";
import { ENDPOINTS } from "../endpoints";

// ✅ Crear Pago
export const createPayment = async (paymentData) => {
  try {
    console.log("📡 Sending registration request...");
    console.log('test endpoint',ENDPOINTS.payment.create)
    const response = await postRequest(ENDPOINTS.payment.create, paymentData);
    return response;
  } catch (error) {
    console.error("❌ Registration failed:", error.response ? error.response.data : error.message);
    return null;
  }
};

export const getCartById = async (id) => {
  try {
    console.log(`📡 Fetching product ID: ${id} from ${ENDPOINTS.payment.getCartById(id)}`);
    const response = await getRequest(ENDPOINTS.payment.getCartById(id));
    console.log("✅ Categoria de Producto recibida:", response);
    return response;
  } catch (error) {
    console.error(`❌ Error fetching product ${id}:`, error.response ? error.response : error.message);
    return null;
  }
};

export const createCart = async (cartData) => {
  try {
    console.log("📡 Sending registration request...");
    console.log('test endpoint',ENDPOINTS.payment.cart)
    const response = await postRequest(ENDPOINTS.payment.cart, cartData);
    return response;
  } catch (error) {
    console.error("❌ Registration failed:", error.response ? error.response.data : error.message);
    return null;
  }
};

// ✅ Cerrar Sesión
export const logoutUser = () => {
  console.log("🔐 Logging out...");
  localStorage.removeItem("token");
};
