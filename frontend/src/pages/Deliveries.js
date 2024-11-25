import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Deliveries.css";

function Deliveries({ setNotification }) {
  const [deliveries, setDeliveries] = useState([]);
  const [form, setForm] = useState({
    customer_name: "",
    address: "",
    order_details: "",
    status: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

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

  const validateForm = () => {
    if (
      !form.customer_name ||
      !form.address ||
      !form.order_details ||
      !form.status
    ) {
      setNotification("Todos os campos devem ser preenchidos.", "error");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      if (isEditing) {
        await axios.put(
          `http://localhost:3000/api/teds/deliveries/${editId}`,
          form
        );
        setNotification("Entrega atualizada com sucesso!", "success");
        setIsEditing(false);
        setEditId(null);
      } else {
        await axios.post("http://localhost:3000/api/teds/deliveries", form);
        setNotification("Entrega adicionada com sucesso!", "success");
      }
      fetchDeliveries();
      setForm({
        customer_name: "",
        address: "",
        order_details: "",
        status: "",
      });
    } catch (error) {
      setNotification("Erro ao salvar entrega.", "error");
    }
  };

  const handleEdit = (delivery) => {
    setForm(delivery);
    setIsEditing(true);
    setEditId(delivery.id);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/teds/deliveries/${id}`);
      fetchDeliveries();
      setNotification("Entrega excluída com sucesso!", "success");
    } catch (error) {
      setNotification("Erro ao excluir entrega.", "error");
    }
  };

  return (
    <div className="deliveries-container">
      <h1>Gestão de Entregas</h1>
      <form className="deliveries-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nome do Cliente"
          value={form.customer_name}
          onChange={(e) => setForm({ ...form, customer_name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Endereço"
          value={form.address}
          onChange={(e) => setForm({ ...form, address: e.target.value })}
        />
        <input
          type="text"
          placeholder="Pedido"
          value={form.order_details}
          onChange={(e) => setForm({ ...form, order_details: e.target.value })}
        />
        <input
          type="text"
          placeholder="Status"
          value={form.status}
          onChange={(e) => setForm({ ...form, status: e.target.value })}
        />
        <button type="submit">
          {isEditing ? "Salvar Alterações" : "Adicionar Entrega"}
        </button>
      </form>
      <ul className="deliveries-list">
        {deliveries.map((delivery) => (
          <li key={delivery.id} className="delivery-item">
            <span>{delivery.customer_name}</span>
            <span>{delivery.address}</span>
            <span>{delivery.order_details}</span>
            <span>{delivery.status}</span>
            <div>
              <button onClick={() => handleEdit(delivery)} className="edit-btn">
                Editar
              </button>
              <button
                onClick={() => handleDelete(delivery.id)}
                className="delete-btn"
              >
                Excluir
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Deliveries;
