import React, { useContext } from "react";
import TopNav from "../../components/TopNav/TopNav";
import { useHistory } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import { TopNavValueContext } from "../../context/TopNavValueContext";
import toastr from "toastr";

const PageHeader = () => {
  const { user, setUser } = useContext(UserContext);
  const { topnavValue, setTopnavValue } = useContext(TopNavValueContext);
  const history = useHistory();

  const homeClicked = async () => {
    setTopnavValue("home");
    history.push("/posts");
  };

  const profileClicked = () => {
    if (!user?.username) {
      toastr["error"]("You need to be logged in to do that", "Login");
    }
    setTopnavValue("profile");
    history.push("/dashboard");
  };

  const notificationClicked = () => {
    setTopnavValue("notifications");
  };
  return (
    <TopNav
      homeClicked={() => homeClicked()}
      profileClicked={() => profileClicked()}
      notificationClicked={() => notificationClicked()}
    />
  );
};

export default PageHeader;
