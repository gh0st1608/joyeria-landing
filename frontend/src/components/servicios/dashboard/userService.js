import { getRequest, postRequest, putRequest, deleteRequest } from "./api";
import { BASE_URL, ENDPOINTS } from "../endpoints";

// 🚀 Obtener todos los usuarios
export const getUsers = async () => {
  try {
    console.log("📡 Fetching users...");
    return await getRequest(`${BASE_URL.auth}${ENDPOINTS.dashboard.users}`);
  } catch (error) {
    console.error("❌ Error fetching users:", error);
    return [];
  }
};

// 🚀 Crear usuario
export const createUser = async (userData) => {
  try {
    console.log("📡 Creating user...");
    return await postRequest(`${BASE_URL.auth}${ENDPOINTS.dashboard.createUser}`, userData);
  } catch (error) {
    console.error("❌ Error creating user:", error);
    return null;
  }
};

// 🚀 Actualizar usuario
export const updateUser = async (id, userData) => {
  try {
    console.log(`📡 Updating user with ID: ${id}`);
    return await putRequest(`${BASE_URL.auth}${ENDPOINTS.dashboard.updateUser(id)}`, userData);
  } catch (error) {
    console.error(`❌ Error updating user ${id}:`, error);
    return null;
  }
};

// 🚀 Eliminar usuario
export const deleteUser = async (id) => {
  try {
    console.log(`📡 Deleting user with ID: ${id}`);
    return await deleteRequest(`${BASE_URL.auth}${ENDPOINTS.dashboard.deleteUser(id)}`);
  } catch (error) {
    console.error(`❌ Error deleting user ${id}:`, error);
    return false;
  }
};
