import { postRequest } from "./api";
import { ENDPOINTS } from "../endpoints";

// ✅ Iniciar Sesión
export const loginUser = async (credentials) => {
  try {
    console.log("📡 Sending login request...");
    const response = await postRequest(ENDPOINTS.auth.login, credentials);
    console.log("✅ Login successful:", response.accessToken);

    localStorage.setItem("token", response.accessToken);

    return response.accessToken;
  } catch (error) {
    console.error("❌ Login failed:", error.response ? error.response.data : error.message);
    return null;
  }
};

// ✅ Registrar Usuario
export const registerUser = async (userData) => {
  try {
    console.log("📡 Sending registration request...");
    const response = await postRequest(ENDPOINTS.auth.register, userData);
    console.log("✅ Registration successful:", response.data);
    return response.data;
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
