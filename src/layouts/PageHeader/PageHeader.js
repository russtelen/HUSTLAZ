import React, { useContext } from "react";
import TopNav from "../../components/TopNav/TopNav";
import { useHistory } from "react-router-dom";
import { TopNavValueContext } from "../../context/TopNavValueContext";

const PageHeader = () => {
  const { topnavValue, setTopnavValue } = useContext(TopNavValueContext);
  const history = useHistory();

  const homeClicked = async () => {
    setTopnavValue("home");
    history.push("/posts");
  };

  const profileClicked = () => {
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
