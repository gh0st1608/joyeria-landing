import { postRequest } from "./api";
import { ENDPOINTS } from "../endpoints";

// ✅ Iniciar Sesión
export const loginUser = async (credentials) => {
  try {
    console.log("📡 Enviando solicitud de inicio de sesión...");

    const response = await postRequest(ENDPOINTS.auth.login, credentials);
    
    if (response && response.accessToken) {
      console.log("✅ Inicio de sesión exitoso:", response);

      // Guardamos tokens en localStorage
      localStorage.setItem("accessToken", response.accessToken);
      if (response.refreshToken) {
        localStorage.setItem("refreshToken", response.refreshToken);
      }

      return response;
    } else {
      console.error("❌ Error: Respuesta inesperada del servidor.");
      return null;
    }

  } catch (error) {
    console.error("❌ Error en el login:", error.response ? error.response.data : error.message);
    return null;
  }
};

// ✅ Registrar Usuario
export const registerUser = async (userData) => {
  try {
    console.log("📡 Enviando solicitud de registro...");

    const response = await postRequest(ENDPOINTS.auth.register, userData);
    
    if (response && response.accessToken) {
      console.log("✅ Registro exitoso:", response);

      // Guardamos tokens en localStorage
      localStorage.setItem("accessToken", response.accessToken);
      if (response.refreshToken) {
        localStorage.setItem("refreshToken", response.refreshToken);
      }

      return response;
    } else {
      console.error("❌ Error: Respuesta inesperada del servidor.");
      return null;
    }

  } catch (error) {
    console.error("❌ Error en el registro:", error.response ? error.response.data : error.message);
    return null;
  }
};

// ✅ Cerrar Sesión
export const logoutUser = () => {
  console.log("🔐 Cerrando sesión...");
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
};
