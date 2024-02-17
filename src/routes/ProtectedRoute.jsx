import { onAuthStateChanged } from "firebase/auth";
import React from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  onAuthStateChanged(auth, (user) => {
    if (user === null) {
      navigate("/login");
    }
  });
  return <>{children}</>;
};

export default ProtectedRoute;
