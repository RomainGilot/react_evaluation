import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAdminStatus = async () => {
      try {
        const token = sessionStorage.getItem("token");
        if (token) {
          const response = await fetch(`http://localhost:4555/isadmin`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          });

          if (response.ok) {
            const data = await response.json();
            setIsAdmin(data.isAdmin);
          } else {
            throw new Error(`Erreur: ${response.statusText}`);
          }
        } else {
          setIsAdmin(false);
        }
      } catch (error) {
        setIsAdmin(false);
      }
    };

    fetchAdminStatus();
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    navigate("/login");
  };

  const navItems = [
    { path: "/", name: "Accueil" },
    ...(isAdmin
      ? [
          { path: "/conference-manager", name: "Gestionnaire de conférences" },
          { path: "/user-manager", name: "Gestionnaire d'utilisateurs" },
        ]
      : []),
  ];

  return (
    <nav className="bg-gray-800 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-16">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="sr-only">Ouvrir menu</span>
              <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            </button>
          </div>
          <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
            <Link to="/" className="text-2xl font-bold mr-10">
              ConfApp
            </Link>
            <div className="hidden sm:flex sm:space-x-4">
              {navItems.map((item, index) => (
                <Link
                  key={index}
                  to={item.path}
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    location.pathname === item.path ? "bg-gray-700 text-white" : "text-gray-300 hover:bg-gray-700 hover:text-white"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <button onClick={handleLogout} className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
              Déconnexion
            </button>
          </div>
        </div>
      </div>
      <div className="sm:hidden" id="mobile-menu">
        <div className="px-2 pt-2 pb-3 space-y-1">
          {navItems.map((item, index) => (
            <Link
              key={index}
              to={item.path}
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                location.pathname === item.path ? "bg-gray-700 text-white" : "text-gray-300 hover:bg-gray-700 hover:text-white"
              }`}
            >
              {item.name}
            </Link>
          ))}
          <button onClick={handleLogout} className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white">
            Déconnexion
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
