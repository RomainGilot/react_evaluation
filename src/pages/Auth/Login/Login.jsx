import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import LayoutAuth from "../components/LayoutAuth";
import Button from "../components/Button";

export default function Login() {
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:4555/login", {
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
        sessionStorage.setItem("token", data);
        navigate("/");
      } else {
        setError(data.message || "Erreur de connexion. Veuillez vérifier vos identifiants.");
      }
    } catch (error) {
      console.error("Erreur de connexion lors de la connexion ", error);
      setError("Erreur de connexion. Veuillez réessayer plus tard.");
    }
  };

  return (
    <LayoutAuth title="Espace de connexion">
      <form onSubmit={handleSubmit}>
        <div className="relative w-full mb-3">
          <label className="block uppercase text-gray-700 text-xs font-bold mb-2" htmlFor="username">
            Identifiant
          </label>
          <input
            type="text"
            name="username"
            id="username"
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
            name="password"
            id="password"
            className="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
            placeholder="Saisir votre mot de passe"
            value={credentials.password}
            onChange={handleChange}
          />
        </div>
        {error && <div className="text-red-500 text-sm mb-4">{error}</div>}
        <Button text="Connexion" />
        <div className="flex flex-wrap mt-6">
          <div className="w-1/2">
            <Link to="/register-admin" className="text-gray-900 font-bold">
              <small>Créer un compte admin</small>
            </Link>
          </div>
          <div className="w-1/2 text-right">
            <Link to="/register" className="text-gray-900 font-bold">
              <small>Créer un compte utilisateur</small>
            </Link>
          </div>
        </div>
      </form>
    </LayoutAuth>
  );
}
