import React from "react";
import TopNav from "../../components/TopNav/TopNav";
import { useHistory } from "react-router-dom";

const PageHeader = () => {
  const history = useHistory();

  const homeClicked = async () => {
    history.push("/posts");
  };

  const profileClicked = () => {
    console.log("profile!");
  };

  const notificationClicked = () => {
    console.log("notifications!");
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
