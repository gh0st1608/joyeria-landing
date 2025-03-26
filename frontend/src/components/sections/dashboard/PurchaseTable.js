import React from "react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";

const PurchaseTable = ({ purchases, onEdit, onDelete }) => {
  return (
    <table className="dashboard-table">
      <thead>
        <tr>
          <th>N°</th>
          <th>Proveedor</th>
          <th>Fecha</th>
          <th>Monto</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {purchases.map((p, index) => (
          <tr key={p._id}>
            <td>{index + 1}</td>
            <td>{p.provider}</td>
            <td>{p.date}</td>
            <td>${p.amount}</td>
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

export default PurchaseTable;
