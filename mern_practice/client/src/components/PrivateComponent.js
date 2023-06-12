import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const PrivateComponent = () => {
  const auth = localStorage.getItem("local");
  return auth ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateComponent;
