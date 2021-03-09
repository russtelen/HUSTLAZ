import React, { useEffect, useContext } from "react";
import { LoginFormContext } from "../../context/LoginFormContext";
import Login from "../../components/Login/Login";
import { useLocation } from "react-router-dom";

const LoginPage = () => {
  // Context
  const { tabValue, setTabValue } = useContext(LoginFormContext);
  const location = useLocation();

  useEffect(() => {
    location.pathname === "/login" ? setTabValue(0) : setTabValue(1);
  }, [location]);

  return <Login />;
};

export default LoginPage;
