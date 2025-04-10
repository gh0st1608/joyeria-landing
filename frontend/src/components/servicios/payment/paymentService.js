import { postRequest, getRequest } from "./api";
import { ENDPOINTS } from "../endpoints";

// ✅ Crear Pago
export const createPayment = async (paymentData) => {
  try {
    const response = await postRequest(ENDPOINTS.payment.create, paymentData);
    return response;
  } catch (error) {
    console.error("❌ Registration failed:", error.response ? error.response.data : error.message);
    return null;
  }
};

export const getCartById = async (id) => {
  try {
    const response = await getRequest(ENDPOINTS.payment.getCartById(id));
    return response;
  } catch (error) {
    console.error(`❌ Error fetching product ${id}:`, error.response ? error.response : error.message);
    return null;
  }
};

export const createCart = async (cartData) => {
  try {
    const response = await postRequest(ENDPOINTS.payment.cart, cartData);
    return response;
  } catch (error) {
    console.error("❌ Registration failed:", error.response ? error.response.data : error.message);
    return null;
  }
};

// ✅ Cerrar Sesión
export const logoutUser = () => {
  localStorage.removeItem("token");
};

export const verifyPayment = async (payerId, token) => {
  try {
    const response = await getRequest(`${ENDPOINTS.payment.create}?token=${token}&PayerID=${payerId}`);
    if (response.success) {
      return { success: true };
    } else {
      return { success: false };
    }
  } catch (error) {
    console.error("Error al verificar el pago", error);
    return { success: false };
  }
};
