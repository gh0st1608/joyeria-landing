import { postRequest } from "./api";
import { ENDPOINTS } from "../endpoints";

// ✅ Iniciar Sesión
export const loginUser = async (credentials) => {
  try {
<<<<<<< HEAD:frontend/src/components/servicios/authService.js
    console.log("📡 Sending login request...", credentials);
    
    const response = await api.post(ENDPOINTS.auth.login, credentials);
    console.log("✅ Login successful:", response.data);

    // Guardar el token en localStorage
    localStorage.setItem("token", response.data.token);
    
    return response.data;
=======
    console.log("📡 Sending login request...");
    const response = await postRequest(ENDPOINTS.auth.login, credentials);
    console.log("✅ Login successful:", response.accessToken);

    localStorage.setItem("token", response.accessToken);

    return response.accessToken;
>>>>>>> a6e7cba12553a87c4f50d03d7750ff1a42748671:frontend/src/components/servicios/auth/authService.js
  } catch (error) {
    console.error("❌ Login failed:", error.response ? error.response.data : error.message);
    return null;
  }
};

// ✅ Registrar Usuario
export const registerUser = async (userData) => {
  try {
<<<<<<< HEAD:frontend/src/components/servicios/authService.js
    console.log("📡 Sending registration request...", userData);
    
    const response = await api.post(ENDPOINTS.auth.register, userData);
=======
    console.log("📡 Sending registration request...");
    const response = await postRequest(ENDPOINTS.auth.register, userData);
>>>>>>> a6e7cba12553a87c4f50d03d7750ff1a42748671:frontend/src/components/servicios/auth/authService.js
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