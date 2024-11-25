import React from "react";
import "./EditDeliveryModal.css";

function EditDeliveryModal({
  delivery,
  onSave,
  onCancel,
  onChange,
  setNotification,
}) {
  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !delivery.customer_name.trim() ||
      !delivery.address.trim() ||
      !delivery.order_details.trim() ||
      !delivery.status.trim()
    ) {
      setNotification("Todos os campos devem ser preenchidos.", "error");
      return;
    }

    onSave(e);
  };

  return (
    <div className="edit-delivery-modal-overlay">
      <div className="edit-delivery-modal">
        <h2>Editar Entrega</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="customer_name">Nome do Cliente</label>
          <input
            id="customer_name"
            type="text"
            placeholder="Nome do Cliente"
            value={delivery.customer_name}
            onChange={(e) =>
              onChange({ ...delivery, customer_name: e.target.value })
            }
          />

          <label htmlFor="address">Endereço</label>
          <input
            id="address"
            type="text"
            placeholder="Endereço"
            value={delivery.address}
            onChange={(e) => onChange({ ...delivery, address: e.target.value })}
          />

          <label htmlFor="order_details">Detalhes do Pedido</label>
          <input
            id="order_details"
            type="text"
            placeholder="Detalhes do Pedido"
            value={delivery.order_details}
            onChange={(e) =>
              onChange({ ...delivery, order_details: e.target.value })
            }
          />

          <label htmlFor="status">Status</label>
          <input
            id="status"
            type="text"
            placeholder="Status"
            value={delivery.status}
            onChange={(e) => onChange({ ...delivery, status: e.target.value })}
          />

          <div className="modal-actions">
            <button type="submit" className="save-btn">
              Salvar
            </button>
            <button type="button" className="cancel-btn" onClick={onCancel}>
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditDeliveryModal;
