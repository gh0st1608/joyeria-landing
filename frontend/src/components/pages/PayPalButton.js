import React, { useState } from "react";
import { crearPagoPayPal } from "../servicios/paypalService";

const PayPalButton = ({ producto, precio }) => {
  const [loading, setLoading] = useState(false);

  const handlePago = async () => {
    setLoading(true);
    try {
      const urlPago = await crearPagoPayPal(producto, precio);
      window.location.href = urlPago;
    } catch (error) {
      console.error("Error al procesar el pago", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button onClick={handlePago} disabled={loading} style={{ backgroundColor: "yellow", padding: "10px", borderRadius: "5px" }}>
      {loading ? "Cargando..." : "Pagar con PayPal"}
    </button>
  );
};

export default PayPalButton;
