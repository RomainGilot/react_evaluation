import React from "react";
import { Navigate } from "react-router-dom";
import { isAuthenticated } from "../../utils/isAuthenticated";

export default function PrivateRoute({ element: Element }) {
  return isAuthenticated() ? <Element /> : <Navigate to="/login" />;
}
