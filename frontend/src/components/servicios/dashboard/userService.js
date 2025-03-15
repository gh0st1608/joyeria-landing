import { getDashboardData, postDashboardData, putDashboardData, deleteDashboardData } from "../dashboard/api";

// ✅ Obtener todos los usuarios
export const getUsers = async () => getDashboardData("/users");

// ✅ Crear un nuevo usuario
export const createUser = async (userData) => postDashboardData("/users", userData);

// ✅ Actualizar un usuario existente
export const updateUser = async (userData) => putDashboardData(`/users/${userData.id}`, userData);

// ✅ Eliminar un usuario
export const deleteUser = async (id) => deleteDashboardData(`/users/${id}`);
