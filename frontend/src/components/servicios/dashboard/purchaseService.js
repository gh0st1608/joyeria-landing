import { getRequest, postRequest, putRequest, deleteRequest } from "./api";
import { ENDPOINTS } from "../../servicios/endpoints";

// Obteniendo compras desde /cartbuy
export const getPurchases = async () => {
  return await getRequest(ENDPOINTS.payment.cart);
};

export const createPurchase = async (data) => {
  return await postRequest(ENDPOINTS.payment.create, data);
};

export const updatePurchase = async (id, data) => {
  return await putRequest(ENDPOINTS.payment.getCartById(id), data);
};

export const deletePurchase = async (id) => {
  return await deleteRequest(ENDPOINTS.payment.getCartById(id));
};
