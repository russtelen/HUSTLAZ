import React from "react";
import UserDetail from "./UserDetail";
import { actions } from "@storybook/addon-actions";

const user = {
  id: 10,
  username: "gokay",
  firstName: null,
  lastName: null,
  email: "gokayabay3@gmail.com",
  address: "123 Main St, 2G3 3G2, BC Canada",
  phoneNumber: null,
  image: "https://miro.medium.com/max/1200/1*mk1-6aYaf_Bes1E3Imhc0A.jpeg",
};

export default {
  title: "UserDetail",
  component: UserDetail,
};

const events = actions({
  closeClicked: "closeClicked",
  editClicked: "editClicked",
  deleteClicked: "deleteClicked",
  imageClicked: "imageClicked",
});

export const Default = () => (
  <UserDetail user={{ ...user }} {...events}></UserDetail>
);
