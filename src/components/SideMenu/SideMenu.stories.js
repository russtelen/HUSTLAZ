import React from "react";
import { actions } from "@storybook/addon-actions";
import SideMenu from "./SideMenu";

export default {
  title: "SideMenu",
  component: SideMenu,
};

const events = actions({
  topPicksClicked: "top picks clicked",
  topsCatClicked: "tops clicked",
  bottomsCatClicked: "bottoms clicked",
  shoesCatClicked: "shoes clicked",
  itemsCatClicked: "items clicked",
  miscCatClicked: "misc clicked",
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
