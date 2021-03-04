import React from "react";
import { actions } from "@storybook/addon-actions";
import TopNav from "./TopNav";

export default {
  title: "TopNav",
  component: TopNav,
};

const events = actions({
  homeClicked: "home clicked",
  profileClicked: "profile clicked",
  notificationClicked: "notfication clicked",
});

export const Default = () => <TopNav {...events} />;
