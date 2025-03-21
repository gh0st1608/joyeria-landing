import React from "react";
import "../../../assets/css/dashboard.css";

const UserTable = ({ users, onEdit, onDelete }) => {
  return (
    <table className="dashboard-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Nombre</th>
          <th>Email</th>
          <th>Rol</th>
          <th>Activo</th>
          <th>Refresh Token</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {users.length > 0 ? (
          users.map((u) => (
            <tr key={u._id}>
              <td>{u._id}</td>
              <td>{u.name}</td>
              <td>{u.email}</td>
              <td>{u.roles}</td>
              <td>{u.active ? "Sí" : "No"}</td>
              <td style={{ maxWidth: "150px", wordBreak: "break-all" }}>{u.refreshToken}</td>
              <td>
                <button className="btn-edit" onClick={() => onEdit(u)}>Editar</button>
                <button className="btn-delete" onClick={() => onDelete(u._id)}>Eliminar</button>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="7" className="no-data">No hay usuarios disponibles</td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default UserTable;
