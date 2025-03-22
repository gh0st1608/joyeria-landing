import React from "react";
import "../../../assets/css/dashboard.css";

const UserTable = ({ users, onEdit, onDelete }) => {
  return (
    <table className="dashboard-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Nombre</th>
          <th>Apellido</th>
          <th>Email</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {users.length > 0 ? (
          users.map((u) => (
            <tr key={u._id}>
              <td>{u._id}</td>
              <td>{u.name}</td>
              <td>{u.lastname}</td>
              <td>{u.email}</td>
              <td>
                <button className="btn-edit" onClick={() => onEdit(u)}>Editar</button>
                <button className="btn-delete" onClick={() => onDelete(u._id)}>Eliminar</button>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="5" className="no-data">No hay usuarios disponibles</td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default UserTable;
