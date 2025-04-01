import React, { useEffect, useState } from "react";
import Dashboard from "../pages/Dashboard";
import { getAllPayments, deletePaymentById } from "../servicios/dashboard/paymentService";
import PaymentTable from "../sections/dashboard/PaymentTable";
import "../../assets/css/dashboard.css";
import Swal from "sweetalert2";

const Payments = () => {
  const [payments, setPayments] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllPayments();
        setPayments(data);
      } catch (err) {
        console.error("❌ Error al obtener pagos:", err);
        Swal.fire("Error", "No se pudieron cargar los pagos", "error");
      }
    };
    fetchData();
  }, []);

  const handleDelete = (_id) => {
    Swal.fire({
      title: "¿Eliminar pago?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc3545",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Sí, eliminar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deletePaymentById(_id);
          setPayments((prev) => prev.filter((p) => p._id !== _id));
          Swal.fire("¡Eliminado!", "El pago fue eliminado.", "success");
        } catch (err) {
          console.error("❌ Error al eliminar pago:", err);
          Swal.fire("Error", "No se pudo eliminar el pago", "error");
        }
      }
    });
  };

  const filteredPayments = payments.filter((p) =>
    (p.cliente || p.payerId || p.userId || "")
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  return (
    <Dashboard>
      <div className="dashboard-content">
        <h2>Historial de Pagos (CartBuy)</h2>
        <div className="filters-container">
          <input
            type="text"
            placeholder="Buscar por cliente, email o ID de pago"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
        <PaymentTable
          payments={filteredPayments}
          onDelete={handleDelete}
          onEdit={() => {}}
          disabledActionsCondition={(p) => Number(p.amount) === 0}
        />
      </div>
    </Dashboard>
  );
};

export default Payments;
