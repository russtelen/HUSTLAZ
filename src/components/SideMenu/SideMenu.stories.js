import React from "react";
import { actions } from "@storybook/addon-actions";
import SideMenu from "./SideMenu";

export default {
  title: "SideMenu",
  component: SideMenu,
};

// const events = actions({
//   homeClicked: "home clicked",
//   profileClicked: "profile clicked",
//   notificationClicked: "notfication clicked",
// });

export const LoggedIn = () => <SideMenu user={{ user_id: "213" }} />;
export const LoggedOut = () => <SideMenu user={null} />;
