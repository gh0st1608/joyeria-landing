import React from "react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import "../../../assets/css/dashboard.css";

const UserTable = ({ users, onEdit, onDelete }) => {
  return (
    <table className="dashboard-table">
      <thead>
        <tr>
          <th>N°</th>
          <th>Nombre</th>
          <th>Apellido</th>
          <th>Email</th>
          <th>Rol</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {users.length > 0 ? (
          users.map((u, index) => (
            <tr key={u._id}>
              <td>{index + 1}</td>
              <td>{u.name}</td>
              <td>{u.lastname}</td>
              <td>{u.email}</td>
              <td>{u.roles}</td>
              <td>
                <button
                  className="icon-btn edit-icon"
                  onClick={() => onEdit(u)}
                  title="Editar usuario"
                >
                  <FaEdit />
                </button>
                <button
                  className="icon-btn delete-icon"
                  onClick={() => onDelete(u._id)}
                  title="Eliminar usuario"
                >
                  <FaTrashAlt />
                </button>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="6" className="no-data">
              No hay usuarios disponibles
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default UserTable;