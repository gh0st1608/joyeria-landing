import api from "./api";
import ENDPOINTS from "./endpoints";

// ✅ Función para Iniciar Sesión
export const loginUser = async (credentials) => {
    try {
      console.log("📡 Sending login request to:", ENDPOINTS.auth.login);
      console.log("📤 Sending data:", credentials);
      
      const response = await api.post(ENDPOINTS.auth.login, credentials);
      
      console.log("✅ Login successful:", response.data);
  
      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        return response.data;
      } else {
        throw new Error("⚠️ No token received in response");
      }
    } catch (error) {
      console.error("❌ Login failed:", error.response ? error.response.data : error.message);
      
      // ⚠️ Mostrar mensaje de error adecuado al usuario
      alert(`❌ ${error.response?.data?.message || "Login failed. Please try again."}`);
      
      return null;
    }
  };
  

// ✅ Función para Cerrar Sesión
export const logoutUser = () => {
  console.log("🔐 Logging out...");
  localStorage.removeItem("token");
};
