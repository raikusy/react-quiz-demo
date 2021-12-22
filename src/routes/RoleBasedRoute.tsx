import React from "react";
import { Navigate } from "react-router-dom";
import { useAuthService } from "../hooks/useAuthRoles";
import AdminHome from "./AdminHome";
import UserHome from "./UserHome";

const RoleBasedRoute: React.FC<any> = () => {
  const { user, isLoggedIn } = useAuthService();

  if (!isLoggedIn && !user?.role) {
    return <Navigate to="/login" />;
  }

  if (user?.role === "ADMIN") {
    return <AdminHome />;
  }

  if (user?.role === "USER") {
    return <UserHome />;
  }

  return null;
};

export default RoleBasedRoute;
