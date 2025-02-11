import React, { useContext } from "react";
import { AuthContext } from "../Providers/AuthProviders";
import Loading from "../Components/Loading";
import { Navigate, useLocation } from "react-router-dom";
const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();
  if (loading) {
    return <Loading></Loading>;
  }
  if (!user) {
    return (
      <Navigate state={{ from: location }} to={"/login"}></Navigate>
    );
  }
  return children;
};

export default PrivateRoute;
