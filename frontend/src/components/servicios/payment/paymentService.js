import { postRequest } from "./api";
import { ENDPOINTS } from "../endpoints";

// ✅ Crear Pago
export const createPayment = async (paymentData) => {
  try {
    console.log("📡 Sending registration request...");
    const response = await postRequest(ENDPOINTS.payment.create, paymentData);
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
