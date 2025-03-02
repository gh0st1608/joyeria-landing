import { postContactMessage } from "./api"; // ✅ Importa la función correcta
import { ENDPOINTS } from "../endpoints";// ✅ Asegúrate de importar los endpoints

// ✅ Función para enviar un mensaje de contacto
export const sendContactMessage = async (contactData) => {
  try {
    console.log("📡 Sending contact message...");
    const response = await postContactMessage(ENDPOINTS.contact.createContact, contactData);
    console.log("✅ Contact message sent successfully:", response);
    return response;
  } catch (error) {
    console.error("❌ Failed to send contact message:", error);
    return null;
  }
};
