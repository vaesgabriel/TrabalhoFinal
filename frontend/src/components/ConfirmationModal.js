import React from "react";
import "./ConfirmationModal.css";

function ConfirmationModal({ message, onConfirm, onCancel }) {
  return (
    <div className="confirmation-modal-overlay">
      <div className="confirmation-modal">
        <p>{message}</p>
        <div className="confirmation-modal-actions">
          <button className="confirm-btn" onClick={onConfirm}>
            Sim
          </button>
          <button className="cancel-btn" onClick={onCancel}>
            Não
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmationModal;
