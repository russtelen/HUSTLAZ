import React from "react";
import TopNav from "../../components/TopNav/TopNav";

const PageHeader = () => {
  const homeClicked = () => {
    console.log("home!");
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
