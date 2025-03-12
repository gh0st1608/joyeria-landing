import React from "react";

const ClientTable = ({ clients }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Nombre</th>
          <th>Email</th>
        </tr>
      </thead>
      <tbody>
        {clients.length > 0 ? (
          clients.map((client) => (
            <tr key={client.id}>
              <td>{client.id}</td>
              <td>{client.name}</td>
              <td>{client.email}</td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="3">No hay clientes registrados</td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default ClientTable;
