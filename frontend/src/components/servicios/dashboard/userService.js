import { getRequest, postRequest, putRequest, deleteRequest } from "./api";
import { ENDPOINTS, BASE_URL } from "../endpoints";

// Obtener todos los usuarios (si tu API devuelve un array desde /user)
export const getUsers = async () => {
  console.log('getusers',`${BASE_URL.auth}${ENDPOINTS.dashboard.user}`)
  return await getRequest(`${BASE_URL.auth}${ENDPOINTS.dashboard.user}`);
};

// Crear usuario
export const createUser = async (userData) => {
  return await postRequest(`${BASE_URL.auth}${ENDPOINTS.dashboard.createUser}`, userData);
};

// Actualizar usuario
export const updateUser = async (id, userData) => {
  return await putRequest(`${BASE_URL.auth}${ENDPOINTS.dashboard.updateUser(id)}`, userData);
};

// Eliminar usuario
export const deleteUser = async (id) => {
  return await deleteRequest(`${BASE_URL.auth}${ENDPOINTS.dashboard.deleteUser(id)}`);

};