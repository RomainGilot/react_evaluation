import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { formatDate } from "../../../utils/formatDate";

export default function Table({ columns, data, onSearch, onDelete, onUpdateType }) {
  const [editUserId, setEditUserId] = useState(null);
  const [newType, setNewType] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const handleTypeChange = async (userId) => {
    try {
      if (newType) {
        await onUpdateType(userId, newType);
        setEditUserId(null);
        setNewType("");
      } else {
        alert("Veuillez sélectionner un nouveau type.");
      }
    } catch (error) {
      console.error("Erreur lors de la mise à jour du type", error);
    }
  };

  function renderColumnContent(row, column) {
    if (column.key === "date") {
      return formatDate(row[column.key]);
    } else {
      return row[column.key];
    }
  }

  const handleEditClick = (rowId) => {
    if (location.pathname.includes("conference-manager")) {
      navigate(`/conference-manager/${rowId}`);
    } else {
      setEditUserId(rowId);
    }
  };

  return (
    <div>
      {onSearch && (
        <div className="mb-10 mt-10 relative">
          <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M11 4a7 7 0 011.517 13.648l4.36 4.36a1 1 0 001.414-1.414l-4.36-4.36A7 7 0 1111 4z"
              />
            </svg>
          </span>
          <input type="text" placeholder="Rechercher..." onChange={(e) => onSearch(e.target.value)} className="border px-3 py-2 rounded w-1/4 pl-10 shadow" />
        </div>
      )}
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-800">
          <tr>
            {columns.map((column, index) => (
              <th key={index} className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                {column.name}
              </th>
            ))}
            <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.length === 0 ? (
            <tr>
              <td colSpan={columns.length + 1} className="px-6 py-4 text-center text-gray-500">
                Aucun résultat trouvé
              </td>
            </tr>
          ) : (
            data.map((row, index) => (
              <tr key={index}>
                {columns.map((column, colIndex) => (
                  <td key={colIndex} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {editUserId === row.id && column.key === "type" ? (
                      <select value={newType} onChange={(e) => setNewType(e.target.value)} className="border px-3 py-1 rounded">
                        <option value="">Sélectionner un type</option>
                        <option value="admin">Admin</option>
                        <option value="user">User</option>
                      </select>
                    ) : (
                      renderColumnContent(row, column)
                    )}
                  </td>
                ))}
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {editUserId === row.id ? (
                    <>
                      <button
                        onClick={() => handleTypeChange(row.id)}
                        className="bg-green-500 text-white hover:bg-green-600 font-semibold py-1 px-2 rounded mr-2"
                      >
                        Enregistrer
                      </button>
                      <button onClick={() => setEditUserId(null)} className="bg-gray-500 text-white hover:bg-gray-600 font-semibold py-1 px-2 rounded">
                        Annuler
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => handleEditClick(row.id)} // Changement de la fonction de clic pour la redirection
                        className="bg-blue-500 text-white hover:bg-blue-600 font-semibold py-1 px-2 rounded mr-2"
                      >
                        Modifier
                      </button>
                      <button onClick={() => onDelete(row.id)} className="bg-red-500 text-white hover:bg-red-600 font-semibold py-1 px-2 rounded">
                        Supprimer
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
