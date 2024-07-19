import React from "react";

export default function ConfirmModal({ isOpen, onClose, onConfirm, title, action, type }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-black opacity-50 absolute inset-0" onClick={onClose}></div>
      <div className="bg-white p-6 rounded-lg shadow-lg z-10 relative">
        <h3 className="text-lg font-semibold mb-4">Confirmation de {title}</h3>
        <p className="mb-4">
          Êtes-vous sûr de vouloir <b>{action}</b> cet {type} ?
        </p>
        <div className="flex justify-end">
          <button onClick={onClose} className="bg-gray-500 text-white hover:bg-gray-600 font-semibold py-2 px-4 rounded mr-2">
            Annuler
          </button>
          <button onClick={onConfirm} className="bg-red-500 text-white hover:bg-red-600 font-semibold py-2 px-4 rounded">
            {action}
          </button>
        </div>
      </div>
    </div>
  );
}
