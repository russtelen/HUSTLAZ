import React, { useEffect, useContext } from "react";
import { Auth } from "aws-amplify";
import { LoginFormContext } from "../../context/LoginFormContext";
import { UserContext } from "../../context/UserContext";
import Login from "../../components/Login/Login";
import { useLocation, useHistory } from "react-router-dom";
import toastr from "toastr";

const LoginPage = () => {
  // Context
  const { tabValue, setTabValue } = useContext(LoginFormContext);
  const { user, setUser } = useContext(UserContext);

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

        if (res.attributes.email_verified) {
          console.log(res);
          // set authenticated in context
          setUser(res);

          // Success notification
          toastr["success"](`Welcome to Hustlaz ${res.username}`);

          // redirect to protected
          history.push("/posts");
        }
        return;
      }

      // SIGNUP Logic
      // ----------------------------------------------
      if (type === "signUp") {
        if (password !== confirmPassword) {
          toastr["error"]("Passwords don't match", "Error");
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
          // Success notification
          toastr["success"](`Successfully registered`);

          // redirect to protected
          history.push("/verifyEmail");
        }
      }
    } catch (e) {
      toastr["error"](e.message, "Error");
    }
  };

  return <Login onSubmit={onSubmit} />;
};

export default LoginPage;
