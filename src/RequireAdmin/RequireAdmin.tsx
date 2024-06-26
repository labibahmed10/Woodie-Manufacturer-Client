import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Navigate, useLocation } from "react-router-dom";
import useAdmin from "../CustomHooks/useAdmin";
import auth from "../firebase.init";
import Spinner from "../Spinner/Spinner";
import { User } from "firebase/auth";

const RequireAdmin = ({ children }: { children: React.ReactNode }) => {
  const [user, loading] = useAuthState(auth);
  const location = useLocation();
  const [admin, aLoading] = useAdmin(user as User);

  if (loading || aLoading) {
    return <Spinner></Spinner>;
  }

  if (!admin) {
    return <Navigate to="/login" state={{ from: location }} replace></Navigate>;
  }

  return children;
};

export default RequireAdmin;
