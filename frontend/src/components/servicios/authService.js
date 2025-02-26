import api from "./api";
import ENDPOINTS from "./endpoints";

// ✅ Iniciar Sesión
export const loginUser = async (credentials) => {
  try {
    console.log("📡 Sending login request...");
    const response = await api.post(ENDPOINTS.auth.login, credentials);
    console.log("✅ Login successful:", response.data);

    localStorage.setItem("token", response.data.token);

    return response.data;
  } catch (error) {
    console.error("❌ Login failed:", error.response ? error.response.data : error.message);
    return null;
  }
};

// ✅ Registrar Usuario
export const registerUser = async (userData) => {
  try {
    console.log("📡 Sending registration request...");
    const response = await api.post(ENDPOINTS.auth.register, userData);
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
