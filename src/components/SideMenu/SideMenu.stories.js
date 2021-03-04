import React from "react";
import { actions } from "@storybook/addon-actions";
import SideMenu from "./SideMenu";

export default {
  title: "SideMenu",
  component: SideMenu,
};

const events = actions({
  topPicksClicked: "top picks clicked",
  cat1Clicked: "category 1 clicked",
  cat2Clicked: "category 2 clicked",
  cat3Clicked: "category 3 clicked",
  cat4Clicked: "category 4 clicked",
  cat5Clicked: "category 5 clicked",
  sellSomethingClicked: "sell something clicked",
  searchClicked: "search clicked",
  loginClicked: "login clicked",
  registerClicked: "register clicked",
  logoutClicked: "logout clicked",
});

export const LoggedIn = () => (
  <SideMenu events={events} user={{ user_id: "213" }} />
);
export const LoggedOut = () => <SideMenu events={events} user={null} />;
