import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import LayoutAuth from "../components/LayoutAuth";
import Button from "../components/Button";

export default function RegisterAdmin() {
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:4555/signupadmin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: credentials.username,
          password: credentials.password,
        }),
      });
      const data = await response.json();

      if (response.ok) {
        navigate("/login");
      } else {
        setError(data.message || "Erreur d'inscription. Veuillez vérifier vos informations.");
      }
    } catch (error) {
      console.error("Erreur lors de l'inscription ", error);
      setError("Erreur d'inscription. Veuillez réessayer plus tard.");
    }
  };

  return (
    <LayoutAuth title="Espace d'inscription administrateur">
      <form onSubmit={handleSubmit}>
        <div className="relative w-full mb-3">
          <label className="block uppercase text-gray-700 text-xs font-bold mb-2" htmlFor="username">
            Identifiant
          </label>
          <input
            type="text"
            id="username"
            name="username"
            className="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
            placeholder="Saisir votre identifiant"
            value={credentials.username}
            onChange={handleChange}
          />
        </div>
        <div className="relative w-full mb-3">
          <label className="block uppercase text-gray-700 text-xs font-bold mb-2" htmlFor="password">
            Mot de passe
          </label>
          <input
            type="password"
            id="password"
            name="password"
            className="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
            placeholder="Saisir votre mot de passe"
            value={credentials.password}
            onChange={handleChange}
          />
        </div>
        {error && <div className="text-red-500 text-sm mb-4">{error}</div>}
        <Button text="Inscription" />
        <div className="flex flex-wrap mt-6">
          <div className="w-1/2">
            <Link to="/register" className="text-gray-900 font-bold">
              <small>Créer un compte utilisateur</small>
            </Link>
          </div>
          <div className="w-1/2 text-right">
            <Link to="/login" className="text-gray-900 font-bold">
              <small>Espace de connexion</small>
            </Link>
          </div>
        </div>
      </form>
    </LayoutAuth>
  );
}
