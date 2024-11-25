import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./DeliveryList.css";
import ConfirmationModal from "../components/ConfirmationModal";
import EditDeliveryModal from "../components/EditDeliveryModal";

function DeliveryList({ setNotification }) {
  const [deliveries, setDeliveries] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [editDelivery, setEditDelivery] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchDeliveries();
  }, []);

  const fetchDeliveries = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/teds/deliveries"
      );
      setDeliveries(response.data);
    } catch (error) {
      setNotification("Erro ao buscar entregas.", "error");
    }
  };

  const confirmDelete = (id) => {
    setDeleteId(id);
    setShowModal(true);
  };

  const handleDelete = async () => {
    try {
      await axios.delete(
        `http://localhost:3000/api/teds/deliveries/${deleteId}`
      );
      fetchDeliveries();
      setNotification("Entrega excluída com sucesso!", "success");
    } catch (error) {
      setNotification("Erro ao excluir entrega.", "error");
    }
    setShowModal(false);
  };

  const handleEdit = (delivery) => {
    setEditDelivery(delivery);
  };

  const handleEditSave = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `http://localhost:3000/api/teds/deliveries/${editDelivery.id}`,
        editDelivery
      );
      fetchDeliveries();
      setEditDelivery(null);
      setNotification("Entrega editada com sucesso!", "success");
    } catch (error) {
      setNotification("Erro ao editar entrega.", "error");
    }
  };

  const handleEditCancel = () => {
    setEditDelivery(null);
  };

  return (
    <div className="delivery-list-container">
      <div className="delivery-header">
        <h1>Lista de Entregas</h1>
        <button
          className="add-delivery-btn"
          onClick={() => navigate("/add-delivery")}
        >
          Adicionar Entrega
        </button>
      </div>
      <table className="delivery-table">
        <thead>
          <tr>
            <th>Nome do Cliente</th>
            <th>Endereço</th>
            <th>Detalhes do Pedido</th>
            <th>Status</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {deliveries.map((delivery) => (
            <tr key={delivery.id}>
              <td>{delivery.customer_name}</td>
              <td>{delivery.address}</td>
              <td>{delivery.order_details}</td>
              <td>{delivery.status}</td>
              <td>
                <button
                  onClick={() => handleEdit(delivery)}
                  className="edit-btn"
                >
                  Editar
                </button>
                <button
                  onClick={() => confirmDelete(delivery.id)}
                  className="delete-btn"
                >
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showModal && (
        <ConfirmationModal
          message="Tem certeza que deseja excluir esta entrega?"
          onConfirm={handleDelete}
          onCancel={() => setShowModal(false)}
        />
      )}

      {editDelivery && (
        <EditDeliveryModal
          delivery={editDelivery}
          onSave={handleEditSave}
          onCancel={handleEditCancel}
          onChange={setEditDelivery}
          setNotification={setNotification}
        />
      )}
    </div>
  );
}

export default DeliveryList;
