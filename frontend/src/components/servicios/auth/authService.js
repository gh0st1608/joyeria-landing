import { postRequest, putRequest } from "./api";
import { ENDPOINTS } from "../endpoints";

// ✅ Iniciar Sesión
export const loginUser = async (credentials) => {
  try {
    const response = await postRequest(ENDPOINTS.auth.login, credentials);

    if (response?.accessToken) {

      // Guardamos tokens y usuario en localStorage
      localStorage.setItem("accessToken", response.accessToken);
      if (response.refreshToken) {
        localStorage.setItem("refreshToken", response.refreshToken);
      }
      localStorage.setItem("user", JSON.stringify(response.user));

      return response;
    } else {
      console.error("❌ Error: Respuesta inesperada del servidor.", response);
      return null;
    }
  } catch (error) {
    console.error("❌ Error en el login:", error.response ? error.response.data : error.message);

    if (error.response?.status === 401) {
      alert("❌ Credenciales incorrectas. Verifica tu usuario y contraseña.");
    } else if (error.response?.status >= 500) {
      alert("❌ Error en el servidor. Inténtalo más tarde.");
    }

    return null;
  }
};

// ✅ Registrar Usuario
export const registerUser = async (userData) => {
  try {
    const response = await postRequest(ENDPOINTS.auth.register, userData);

    if (response?.accessToken) {

      // Guardamos tokens y usuario en localStorage
      localStorage.setItem("accessToken", response.accessToken);
      if (response.refreshToken) {
        localStorage.setItem("refreshToken", response.refreshToken);
      }
      localStorage.setItem("user", JSON.stringify(response.user));

      return response;
    } else {
      console.error("❌ Error: Respuesta inesperada del servidor.", response);
      return null;
    }
  } catch (error) {
    console.error("❌ Error en el registro:", error.response ? error.response.data : error.message);

    if (error.response?.status === 409) {
      alert("⚠️ El correo ya está registrado. Intenta con otro.");
    } else if (error.response?.status >= 500) {
      alert("❌ Error en el servidor. Inténtalo más tarde.");
    }

    return null;
  }
};

// ✅ Cerrar Sesión
export const logoutUser = () => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
  localStorage.removeItem("user");
  alert("👋 Sesión cerrada exitosamente.");
};

// ✅ Actualizar Configuración del Usuario
export const updateUserSettings = async (settings) => {
  try {
    const response = await putRequest(ENDPOINTS.auth.updateSettings, settings);

    if (response?.user) {
      localStorage.setItem("user", JSON.stringify(response.user));
      alert("✅ Configuración actualizada correctamente.");
      return response.user;
    } else {
      console.error("❌ Error: No se pudo actualizar la configuración.");
      return null;
    }
  } catch (error) {
    console.error("❌ Error al actualizar la configuración:", error.response ? error.response.data : error.message);
    alert("❌ Error al actualizar la configuración.");
    return null;
  }
};