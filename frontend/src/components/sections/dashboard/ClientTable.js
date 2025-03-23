import React from "react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";

const ClientTable = ({ clients, onEdit, onDelete }) => {
  return (
    <table className="dashboard-table">
      <thead>
        <tr>
          <th>N°</th>
          <th>Nombre</th>
          <th>Email</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {clients.map((c, index) => (
          <tr key={c._id}>
            <td>{index + 1}</td>
            <td>{c.name}</td>
            <td>{c.email}</td>
            <td>
              <button className="icon-btn edit-icon" onClick={() => onEdit(c)} title="Editar">
                <FaEdit />
              </button>
              <button className="icon-btn delete-icon" onClick={() => onDelete(c._id)} title="Eliminar">
                <FaTrashAlt />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ClientTable;
