import React, { useEffect, useState } from "react";
import LayoutPage from "../../../shared/LayoutPage";
import TitlePage from "../../../shared/TitlePage";
import Table from "../components/Table";
import ConfirmDeleteModal from "../components/ConfirmModal";
export default function UserManager() {
  const [searchTerm, setSearchTerm] = useState("");
  const [users, setUsers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const token = sessionStorage.getItem("token");

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const filteredUsers = users.filter(
    (user) => user.id.toLowerCase().includes(searchTerm.toLowerCase()) || user.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost:4555/users", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error(`Erreur ${response.statusText}`);
        }

        setUsers(await response.json());
      } catch (error) {
        console.error("impossible de récupérer les données ", error);
      }
    };

    fetchUsers();
  }, [token]);

  const deleteUser = async () => {
    try {
      const response = await fetch(`http://localhost:4555/user/${userToDelete}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Erreur ${response.statusText}`);
      }

      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userToDelete));
      setIsModalOpen(false);
    } catch (error) {
      console.error("Impossible de supprimer l'utilisateur", error);
    }
  };

  const updateUserType = async (userId, newType) => {
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

      setUsers((prevUsers) => prevUsers.map((user) => (user.id === userId ? { ...user, type: newType } : user)));
    } catch (error) {
      console.error("Impossible de mettre à jour le type de l'utilisateur", error);
    }
  };

  const columns = [
    { name: "ID", key: "id" },
    { name: "Type", key: "type" },
  ];

  return (
    <LayoutPage>
      <TitlePage title="Gestionnaire d'utilisateurs" />
      <Table
        columns={columns}
        data={filteredUsers}
        searchPlaceholder="Rechercher un utilisateur..."
        onSearch={handleSearch}
        onDelete={(userId) => {
          setUserToDelete(userId);
          setIsModalOpen(true);
        }}
        onUpdateType={updateUserType}
      />
      <ConfirmDeleteModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={deleteUser}
        title="Suppression"
        action="Supprimer"
        type="Utilisateur"
      />
    </LayoutPage>
  );
}
