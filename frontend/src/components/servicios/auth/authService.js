import { postRequest } from "./api";
import { ENDPOINTS } from "../endpoints";

// ✅ Función para Iniciar Sesión
export const loginUser = async (credentials) => {
  try {
    console.log("📡 Sending login request...");
    const response = await api.post(ENDPOINTS.auth.login, credentials);
    console.log("✅ Login successful:", response.data);

    localStorage.setItem("token", response.data.token);

    return response.data;
  } catch (error) {
    console.error("❌ Login failed:", error.response?.data || error.message);
    
    throw new Error(error.response?.data?.message || "Invalid credentials. Please try again.");
  }
};

// ✅ Función para Registrarse
export const registerUser = async (userData) => {
  try {
    console.log("📡 Sending registration request...");
    const response = await api.post(ENDPOINTS.auth.register, userData);
    console.log("✅ Registration successful:", response.data);

    return response.data;
  } catch (error) {
    console.error("❌ Registration failed:", error.response?.data || error.message);
    
    throw new Error(error.response?.data?.message || "Error registering. Please try again.");
  }
};

// ✅ Función para Cerrar Sesión
export const logoutUser = () => {
  console.log("🔐 Logging out...");
  localStorage.removeItem("token");
};

// ✅ Obtener lista de usuarios
export const getUsers = async () => {
  try {
    console.log("📡 Fetching users...");
    
    const response = await api.get(ENDPOINTS.auth.userList);
    console.log("✅ Users received:", response.data);

    return response.data;
  } catch (error) {
    console.error("❌ Error fetching users:", error.response?.data || error.message);
    return [];
  }
};
