import { getRequest, postRequest, putRequest, deleteRequest } from "./api";
import { ENDPOINTS } from "../endpoints";

// Obtener todos los usuarios
export const getUsers = async () => {
  return await getRequest(ENDPOINTS.dashboard.users);
};

// Crear usuario
export const createUser = async (userData) => {
  return await postRequest(ENDPOINTS.dashboard.createUser, userData);
};

// Actualizar usuario
export const updateUser = async (id, userData) => {
  return await putRequest(ENDPOINTS.dashboard.updateUser(id), userData);
};

// Eliminar usuario
export const deleteUser = async (id) => {
  return await deleteRequest(ENDPOINTS.dashboard.deleteUser(id));
};
