import React, { useState } from "react";
import "../../../assets/css/dashboard.css";

const PaymentTable = ({ payments = [], onEdit, onDelete }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Total de páginas
  const totalPages = Math.ceil(payments.length / itemsPerPage);

  // Paginación: obtener solo los pagos de la página actual
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentPayments = payments.slice(startIndex, startIndex + itemsPerPage);

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <div className="dashboard-table-container">
      <h2>Historial de Pagos</h2>
      <table className="dashboard-table">
        <thead>
          <tr>
            <th>N°</th>
            <th>ID Pago</th>
            <th>Fecha</th>
            <th>Monto Total</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {currentPayments.length === 0 ? (
            <tr>
              <td colSpan="6" style={{ textAlign: "center", padding: "1rem" }}>
                No hay pagos registrados.
              </td>
            </tr>
          ) : (
            currentPayments.map((p, index) => (
              <tr key={p._id || index}>
                <td>{startIndex + index + 1}</td>
                <td>{p.payerId || "N/A"}</td>
                <td>{new Date(p.createTime).toLocaleString()}</td>
                <td>$ {Number(p.amount || 0).toFixed(2)}</td>
                <td>
                  <span className={`status-badge status-${p.status?.toLowerCase()}`}>
                    {p.status || "Desconocido"}
                  </span>
                </td>
                <td>
                  <td>
                    <button
                      className="cancel-btn"
                      title="Acción no disponible"
                      disabled
                    >
                      Cancelar
                    </button>
                  </td>

                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* Controles de paginación */}
      {totalPages > 1 && (
        <div className="pagination-controls">
          <button onClick={handlePrev} disabled={currentPage === 1}>
            Anterior
          </button>
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              className={currentPage === i + 1 ? "active" : ""}
              onClick={() => setCurrentPage(i + 1)}
            >
              {i + 1}
            </button>
          ))}
          <button onClick={handleNext} disabled={currentPage === totalPages}>
            Siguiente
          </button>
        </div>
      )}
    </div>
  );
};

export default PaymentTable;
