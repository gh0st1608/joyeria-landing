
import { BASE_URL, ENDPOINTS } from "../endpoints";

// Obtener todos los pagos
export const getAllPayments = async () => {
  const res = await fetch(`${BASE_URL.payment}${ENDPOINTS.payment.listPays}`);
  if (!res.ok) throw new Error("Error al obtener la lista de pagos");
  return await res.json();
};

// Eliminar un pago por ID
export const deletePaymentById = async (_id) => {
  const res = await fetch(`${BASE_URL.payment}${ENDPOINTS.payment.deletePay(_id)}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Error al eliminar el pago");
  return await res.json();
};
