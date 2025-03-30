import { getRequest, deleteRequest } from "./api";
import { ENDPOINTS } from "../endpoints";

// Trae todos los pagos desde el endpoint de cartbuy
export const getPayments = async () => {
  return await getRequest(ENDPOINTS.payment.listPays);
};

// Elimina un pago (cartbuy)
export const deletePayment = async (id) => {
  return await deleteRequest(ENDPOINTS.payment.deletePay(id));
};
