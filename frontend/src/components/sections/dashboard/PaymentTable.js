import React from "react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import "../../../assets/css/dashboard.css";

const PaymentTable = ({ payments, onEdit, onDelete }) => {
  return (
    <table className="dashboard-table">
      <thead>
        <tr>
          <th>N°</th>
          <th>Cliente</th>
          <th>Fecha</th>
          <th>Monto Total</th>
          <th>Estado</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {payments.map((p, index) => (
          <tr key={p._id}>
            <td>{index + 1}</td>
            <td>{p.cliente}</td>
            <td>{new Date(p.fecha).toLocaleDateString()}</td>
            <td>${p.montoTotal.toFixed(2)}</td>
            <td>{p.estado}</td>
            <td>
              <button className="icon-btn edit-icon" onClick={() => onEdit(p)} title="Editar">
                <FaEdit />
              </button>
              <button className="icon-btn delete-icon" onClick={() => onDelete(p._id)} title="Eliminar">
                <FaTrashAlt />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default PaymentTable;
