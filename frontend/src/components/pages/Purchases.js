import React, { useEffect, useState } from "react";
import Dashboard from "../pages/Dashboard";
import { getPurchases, createPurchase, updatePurchase, deletePurchase } from "../servicios/dashboard/purchaseService";
import PurchaseTable from "../sections/dashboard/PurchaseTable";
import "../../assets/css/dashboard.css";
import Swal from "sweetalert2";

const Purchases = () => {
  const [purchases, setPurchases] = useState([]);
  const [formData, setFormData] = useState({ provider: "", date: "", amount: "" });
  const [isEditing, setIsEditing] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const data = await getPurchases();
      setPurchases(data);
    };
    fetchData();
  }, []);

  const handleEdit = (purchase) => {
    setFormData(purchase);
    setIsEditing(true);
    setShowModal(true);
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "¿Eliminar compra?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc3545",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Sí, eliminar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await deletePurchase(id);
        setPurchases(purchases.filter((p) => p._id !== id));
        Swal.fire("¡Eliminado!", "La compra fue eliminada.", "success");
      }
    });
  };

  const handleNewPurchase = () => {
    setFormData({ provider: "", date: "", amount: "" });
    setIsEditing(false);
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isEditing) {
      await updatePurchase(formData._id, formData);
      setPurchases(purchases.map((p) => (p._id === formData._id ? formData : p)));
    } else {
      const newPurchase = await createPurchase(formData);
      setPurchases([...purchases, newPurchase]);
    }
    setShowModal(false);
  };

  const filteredPurchases = purchases.filter((p) =>
    p.provider.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Dashboard>
      <div className="dashboard-content">
        <h2>Gestión de Compras</h2>
        <div className="filters-container">
          <input
            type="text"
            placeholder="Buscar por proveedor"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <button className="btn-new-product" onClick={handleNewPurchase}>Nueva Compra</button>
        </div>
        <PurchaseTable purchases={filteredPurchases} onEdit={handleEdit} onDelete={handleDelete} />
        {showModal && (
          <div className="custom-modal-overlay">
            <div className="custom-modal">
              <h3>{isEditing ? "Editar Compra" : "Nueva Compra"}</h3>
              <form onSubmit={handleSubmit}>
                <div className="modal-form-grid">
                  <input
                    type="text"
                    placeholder="Proveedor"
                    value={formData.provider}
                    onChange={(e) => setFormData({ ...formData, provider: e.target.value })}
                    required
                  />
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    required
                  />
                  <input
                    type="number"
                    placeholder="Monto"
                    value={formData.amount}
                    onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                    required
                  />
                </div>
                <div className="custom-modal-buttons">
                  <button type="submit" className="btn-edit">Guardar</button>
                  <button type="button" className="btn-delete" onClick={() => setShowModal(false)}>Cerrar</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </Dashboard>
  );
};

export default Purchases;
