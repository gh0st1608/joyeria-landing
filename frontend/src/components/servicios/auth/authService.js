import { postRequest, putRequest, getRequest, deleteRequest } from "./api";
import { ENDPOINTS, BASE_URL } from "../endpoints";

// 🔐 Iniciar Sesión
export const loginUser = async (credentials) => {
  console.log("🔐 Enviando login con: ", credentials);
  console.log("➡️ URL:", `${BASE_URL.auth}${ENDPOINTS.auth.login}`);

  try {
    const url = `${BASE_URL.auth}${ENDPOINTS.auth.login}`;
    const response = await postRequest(url, credentials);
    console.log("✅ Respuesta:", response);

    if (response?.accessToken) {
      localStorage.setItem("accessToken", response.accessToken);
      if (response.refreshToken) {
        localStorage.setItem("refreshToken", response.refreshToken);
      }
      if (response.user) {
        localStorage.setItem("user", JSON.stringify(response.user));
      }
      return response;
      
    } else {
      console.error("❌ Error: Respuesta inesperada del servidor.", response);
      return null;
    }
  } catch (error) {
    console.error("❌ Error en el login:", error.response?.data || error.message);

    if (error.response?.status === 401) {
      alert("❌ Credenciales incorrectas.");
    } else if (error.response?.status >= 500) {
      alert("❌ Error del servidor. Inténtalo más tarde.");
    }

    return null;
  }

};

// 📝 Registrar Usuario
export const registerUser = async (userData) => {
  try {
    const url = `${BASE_URL.auth}${ENDPOINTS.auth.register}`;
    const response = await postRequest(url, userData);

    if (response?.accessToken) {
      localStorage.setItem("accessToken", response.accessToken);
      if (response.refreshToken) {
        localStorage.setItem("refreshToken", response.refreshToken);
      }
      if (response.user) {
        localStorage.setItem("user", JSON.stringify(response.user));
      }
      return response;
    } else {
      console.error("❌ Error: Respuesta inesperada del servidor.", response);
      return null;
    }
  } catch (error) {
    console.error("❌ Error en el registro:", error.response?.data || error.message);

    if (error.response?.status === 409) {
      alert("⚠️ El correo ya está registrado.");
    } else if (error.response?.status >= 500) {
      alert("❌ Error del servidor. Inténtalo más tarde.");
    }

    return null;
  }
};

// 🚪 Cerrar sesión
export const logoutUser = () => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
  localStorage.removeItem("user");
  alert("👋 Sesión cerrada exitosamente.");
};

// 👥 Obtener todos los usuarios
export const getUsers = async () => {
  const url = `${BASE_URL.auth}${ENDPOINTS.dashboard.user}`;
  console.log('📡 GET users =>', url);
  return await getRequest(url);
};

// ➕ Crear nuevo usuario
export const createUser = async (userData) => {
  const url = `${BASE_URL.auth}${ENDPOINTS.dashboard.createUser}`;
  return await postRequest(url, userData);
};

// ✏️ Actualizar usuario
export const updateUser = async (id, userData) => {
  const url = `${BASE_URL.auth}${ENDPOINTS.dashboard.updateUser(id)}`;
  return await putRequest(url, userData);
};

// 🗑️ Eliminar usuario
export const deleteUser = async (id) => {
  const url = `${BASE_URL.auth}${ENDPOINTS.dashboard.deleteUser(id)}`;
  return await deleteRequest(url);
};
// ✅ Actualizar configuración del usuario
export const updateUserSettings = async (settings) => {
  try {
    const url = `${BASE_URL.auth}${ENDPOINTS.auth.updateSettings}`; // asegúrate de tener este endpoint
    const response = await putRequest(url, settings);

    if (response?.user) {
      localStorage.setItem("user", JSON.stringify(response.user));
      alert("✅ Configuración actualizada correctamente.");
      return response.user;
    } else {
      console.error("❌ No se pudo actualizar.");
      return null;
    }
  } catch (error) {
    console.error("❌ Error al actualizar configuración:", error.response?.data || error.message);
    alert("❌ Error al actualizar la configuración.");
    return null;
  }
};
