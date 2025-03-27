import { getRequest, postRequest, putRequest, deleteRequest } from "./api";
import { ENDPOINTS } from "../../servicios/endpoints";

export const getPurchases = async () => {
  return await getRequest(ENDPOINTS.dashboard.purchases);
};

export const createPurchase = async (data) => {
  return await postRequest(ENDPOINTS.dashboard.createPurchase, data);
};

export const updatePurchase = async (id, data) => {
  return await putRequest(ENDPOINTS.dashboard.updatePurchase(id), data);
};

export const deletePurchase = async (id) => {
  return await deleteRequest(ENDPOINTS.dashboard.deletePurchase(id));
};
