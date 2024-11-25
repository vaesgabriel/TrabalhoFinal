import React, { useState } from "react";
import axios from "axios";
import "./AddDelivery.css";

function AddDelivery({ setNotification }) {
  const [form, setForm] = useState({
    customer_name: "",
    address: "",
    order_details: "",
    status: "",
  });

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
      await axios.post("http://localhost:3000/api/teds/deliveries", form);
      setNotification("Entrega adicionada com sucesso!", "success");
      setForm({
        customer_name: "",
        address: "",
        order_details: "",
        status: "",
      });
    } catch (error) {
      setNotification("Erro ao adicionar entrega.", "error");
    }
  };

  return (
    <div className="add-delivery-container">
      <h1>Adicionar Nova Entrega</h1>
      <form className="add-delivery-form" onSubmit={handleSubmit}>
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
          placeholder="Detalhes do Pedido"
          value={form.order_details}
          onChange={(e) => setForm({ ...form, order_details: e.target.value })}
        />
        <input
          type="text"
          placeholder="Status"
          value={form.status}
          onChange={(e) => setForm({ ...form, status: e.target.value })}
        />
        <button type="submit">Adicionar Entrega</button>
      </form>
    </div>
  );
}

export default AddDelivery;
