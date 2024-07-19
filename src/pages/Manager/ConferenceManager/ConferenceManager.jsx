import React, { useEffect, useState } from "react";
import LayoutPage from "../../../shared/LayoutPage";
import TitlePage from "../../../shared/TitlePage";
import Table from "../components/Table";
import ConfirmDeleteModal from "../components/ConfirmModal";
import { Link } from "react-router-dom";

export default function ConferenceManager() {
  const [searchTerm, setSearchTerm] = useState("");
  const [conferences, setConferences] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [conferenceToDelete, setConferenceToDelete] = useState(null);
  const token = sessionStorage.getItem("token");

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const filteredUsers = conferences.filter((conference) => conference.title.toLowerCase().includes(searchTerm.toLowerCase()));

  useEffect(() => {
    const fetchConferences = async () => {
      try {
        const response = await fetch("http://localhost:4555/conferences", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error(`Erreur ${response.statusText}`);
        }

        setConferences(await response.json());
      } catch (error) {
        console.error("impossible de récupérer les données ", error);
      }
    };

    fetchConferences();
  }, [token]);

  const deleteUser = async () => {
    try {
      const response = await fetch(`http://localhost:4555/conference/${conferenceToDelete}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Erreur ${response.statusText}`);
      }

      setConferences((prevConferences) => prevConferences.filter((conference) => conference.id !== conferenceToDelete));
      setIsModalOpen(false);
    } catch (error) {
      console.error("Impossible de supprimer l'utilisateur", error);
    }
  };

  const updateConferenceType = async (userId, newType) => {
    console.log(newType);

    try {
      const response = await fetch(`http://localhost:4555/usertype/${userId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          newType: newType,
        }),
      });

      if (!response.ok) {
        throw new Error(`Erreur ${response.statusText}`);
      }

      setConferences((prevUsers) => prevUsers.map((user) => (user.id === userId ? { ...user, type: newType } : user)));
    } catch (error) {
      console.error("Impossible de mettre à jour le type de l'utilisateur", error);
    }
  };

  const columns = [
    { name: "#", key: "id" },
    { name: "Titre", key: "title" },
    { name: "Date", key: "date" },
    { name: "Description", key: "description" },
  ];

  return (
    <LayoutPage>
      <TitlePage title="Gestionnaire des conférences" />
      <Link to="/conference-manager/create">
        <button className="bg-green-600 p-2 rounded-lg mt-5 text-white">Ajouter une conférence</button>
      </Link>
      <Table
        columns={columns}
        data={filteredUsers}
        onSearch={handleSearch}
        onDelete={(conferenceId) => {
          setConferenceToDelete(conferenceId);
          setIsModalOpen(true);
        }}
        onUpdateType={updateConferenceType}
      />
      <ConfirmDeleteModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={deleteUser}
        title="Suppression"
        action="Supprimer"
        type="Conférence"
      />
    </LayoutPage>
  );
}
