import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "../pages/Home/Home";

import Login from "../pages/Auth/Login/Login";
import Register from "../pages/Auth/Register/Register";

import DetailsConference from "../pages/DetailsConference/DetailsConference";

import ConferenceManager from "../pages/Manager/ConferenceManager/ConferenceManager";
import UserManager from "../pages/Manager/UserManager/UserManager";

import NotFound from "../pages/NotFound/NotFound";

import PrivateRoute from "./components/PrivateRoute";
import ConferenceManagerUpdate from "../pages/Manager/ConferenceManagerUpdate/ConferenceManagerUpdate";
import ConferenceManagerCreate from "../pages/Manager/ConferenceManagerCreate/ConferenceManagerCreate";
import RegisterAdmin from "../pages/Auth/RegisterAdmin/RegisterAdmin";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PrivateRoute element={Home} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/register-admin" element={<RegisterAdmin />} />

        <Route path="/details/:id" element={<DetailsConference />} />
        <Route path="/conference-manager" element={<PrivateRoute element={ConferenceManager} />} />
        <Route path="/conference-manager/:id" element={<PrivateRoute element={ConferenceManagerUpdate} />} />
        <Route path="/conference-manager/create" element={<PrivateRoute element={ConferenceManagerCreate} />} />

        <Route path="/user-manager" element={<PrivateRoute element={UserManager} />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
