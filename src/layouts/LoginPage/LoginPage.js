import React, { useEffect, useContext, useRef } from "react";
import { LoginFormContext } from "../../context/LoginFormContext";
import { UserContext } from "../../context/UserContext";
import Login from "../../components/Login/Login";
import { useLocation, useHistory } from "react-router-dom";
import toastr from "toastr";
import { signUp, loginUser, currentUser } from "../../userAuth";

const LoginPage = () => {
  // Context
  const { setTabValue } = useContext(LoginFormContext);
  const setTabValueReference = useRef(() => {})
  setTabValueReference.current = setTabValue
  const { setUser } = useContext(UserContext);

  // Router
  const location = useLocation();
  const history = useHistory();

  useEffect(() => {
    location.pathname === "/login" ? setTabValueReference.current(0) : setTabValueReference.current(1);
  }, [location]);

  const onSubmit = async (formData) => {
    try {
      let result;
      // LOGIN Logic
      // ----------------------------------------------
      if (formData.type === "login") {
        result = await loginUser(formData);
        setUser(currentUser());
        // Success notification
        toastr["success"](`Welcome to Hustlaz ${currentUser().username}`);
        // Redirect to protected
        history.push("/posts");
      }
      // SIGNUP Logic
      // ----------------------------------------------
      if (formData.type === "signUp") {
        if (formData.password !== formData.confirmPassword) {
          toastr["error"]("Passwords don't match", "Error");
          return;
        }
        result = await signUp(formData);
        if (result) {
          // Success notification
          toastr["success"](`Successfully registered`);
          // Redirect to protected
          history.push("/verifyEmail");
        }
      }
    } catch (e) {
      toastr["error"](e.message, "Error");
      setUser();
    }
  };

  return <Login onSubmit={onSubmit} />;
};

export default LoginPage;
