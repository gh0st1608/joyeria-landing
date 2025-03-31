import contactApi from "./api"; // ✅ Usa la API de contacto
import { ENDPOINTS } from "../endpoints";

// ✅ Función para enviar mensaje de contacto
export const sendContactMessage = async (contactData) => {
  try {
    console.log("📡 Sending contact request...");
    const response = await contactApi.post(ENDPOINTS.notification.create, contactData);
    console.log('✅ Contact message sent successfully:',response)
    return response.data;
  } catch (error) {
    console.error("❌ Contact message failed:", error.response ? error.response.data : error.message);
    return null;
  }
};
