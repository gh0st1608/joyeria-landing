import { getDashboardData, postDashboardData, putDashboardData, deleteDashboardData } from "../dashboard/api";

// ✅ Obtener clientes
export const getClients = async () => getDashboardData("/clients");

// ✅ Crear un nuevo cliente
export const createClient = async (clientData) => postDashboardData("/clients", clientData);

// ✅ Actualizar un cliente
export const updateClient = async (clientData) => putDashboardData(`/clients/${clientData.id}`, clientData);

// ✅ Eliminar un cliente
export const deleteClient = async (id) => deleteDashboardData(`/clients/${id}`);
