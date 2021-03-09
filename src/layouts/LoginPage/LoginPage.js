import React, { useEffect, useContext } from "react";
import { Auth } from "aws-amplify";
import { LoginFormContext } from "../../context/LoginFormContext";
import Login from "../../components/Login/Login";
import { useLocation, useHistory } from "react-router-dom";

const LoginPage = () => {
  // Context
  const { tabValue, setTabValue } = useContext(LoginFormContext);

  // Router
  const location = useLocation();
  const history = useHistory();

  useEffect(() => {
    location.pathname === "/login" ? setTabValue(0) : setTabValue(1);
  }, [location]);

  const onSubmit = async (formData) => {
    try {
      //Destructuring
      const { type, username, password, email, confirmPassword } = formData;

      // LOGIN Logic
      // ----------------------------------------------
      if (type === "login") {
        const res = await Auth.signIn(username, password);
        if (res) {
          // set authenticated in context === true

          // redirect to protected
          history.push("/posts");
        }
        return;
      }

      // SIGNUP Logic
      // ----------------------------------------------
      if (type === "signUp") {
        if (password !== confirmPassword) {
          alert("Passwords don't match");
          return;
        }

        const res = await Auth.signUp({
          username,
          password,
          attributes: {
            email: email,
          },
        });

        if (res) {
          // set authenticated user in context === true

          // redirect to protected
          history.push("/posts");
        }
      }
    } catch (e) {
      alert(e.message);
    }
  };

  return <Login onSubmit={onSubmit} />;
};

export default LoginPage;
