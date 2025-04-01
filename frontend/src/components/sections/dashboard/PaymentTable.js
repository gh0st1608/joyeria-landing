import React from "react";
import "../../../assets/css/dashboard.css";

const PaymentTable = ({ payments }) => {
  return (
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
        {payments.map((p, index) => (
          <tr key={p._id}>
            <td>{index + 1}</td>
            <td>{p.payerId}</td>
            <td>{new Date(p.createTime).toLocaleString()}</td>
            <td>S/ {p.amount}</td>
            <td>{p.status}</td>
            <td>
              <button
                className="btn btn-secondary btn-sm"
                disabled
                style={{ opacity: 0.6, cursor: "not-allowed" }}
              >
                Cancelar
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default PaymentTable;
