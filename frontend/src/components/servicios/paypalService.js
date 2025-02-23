import api from "./api";
import endpoints from "./endpoints";

export const crearPagoPayPal = async (producto, precio) => {
  try {
    const response = await api.post(endpoints.crearPagoPayPal, {
      producto,
      precio,
    });
    return response.data.url;
  } catch (error) {
    console.error("Error en PayPal:", error);
    throw error;
  }
};
