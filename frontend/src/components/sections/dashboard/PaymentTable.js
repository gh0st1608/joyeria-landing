import React from "react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import "../../../assets/css/dashboard.css";

const PaymentTable = ({ payments = [], onEdit, onDelete }) => {
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
          {payments.length === 0 ? (
            <tr>
              <td colSpan="6" style={{ textAlign: "center", padding: "1rem" }}>
                No hay pagos registrados.
              </td>
            </tr>
          ) : (
            payments.map((p, index) => (
              <tr key={p._id || index}>
                <td>{index + 1}</td>
                <td>{p.payerId || "N/A"}</td>
                <td>{new Date(p.createTime).toLocaleString()}</td>
                <td>S/ {Number(p.montoTotal || 0).toFixed(2)}</td>
                <td>
                  <span className={`status-badge status-${p.status?.toLowerCase()}`}>
                    {p.status || "Desconocido"}
                  </span>
                </td>
                <td>

                  <button
                    className="icon-btn edit-icon"
                    onClick={() => onEdit(p)}
                    title="Editar"
                    disabled
                    style={{ opacity: 0.5, cursor: "not-allowed" }}
                  >
                    <FaEdit />
                  </button>

                  <button
                    className="icon-btn delete-icon"
                    onClick={() => onDelete(p._id)}
                    title="Eliminar"
                    disabled
                    style={{ opacity: 0.5, cursor: "not-allowed" }}
                  >
                    <FaTrashAlt />
                  </button>




                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default PaymentTable;
