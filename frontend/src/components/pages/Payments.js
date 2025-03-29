import React, { useEffect, useState } from "react";
import Dashboard from "../pages/Dashboard";
import { getPayments, deletePayment } from "../servicios/dashboard/paymentService";
import PaymentTable from "../sections/dashboard/PaymentTable";
import "../../assets/css/dashboard.css";
import Swal from "sweetalert2";

const Payments = () => {
  const [payments, setPayments] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const data = await getPayments();
      console.log('data payment list',data)
      setPayments(data);
    };
    fetchData();
  }, []);

  const handleDelete = (id) => {
    Swal.fire({
      title: "¿Eliminar pago?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc3545",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Sí, eliminar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await deletePayment(id);
        setPayments(payments.filter((p) => p._id !== id));
        Swal.fire("¡Eliminado!", "El pago fue eliminado.", "success");
      }
    });
  };

  const filteredPayments = payments.filter((p) =>
    p.cliente?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Dashboard>
      <div className="dashboard-content">
        <h2>Historial de Pagos (CartBuy)</h2>
        <div className="filters-container">
          <input
            type="text"
            placeholder="Buscar por cliente"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
        <PaymentTable payments={filteredPayments} onDelete={handleDelete} />
      </div>
    </Dashboard>
  );
};

export default Payments;
