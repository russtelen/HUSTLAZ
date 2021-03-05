import React from "react";
import NewPosting from "./NewPosting";
import { actions } from "@storybook/addon-actions";

export default {
  title: "NewPosting",
  component: NewPosting,
};

const events = actions({
  submit: "submit clicked",
});

export const Default = () => <NewPosting {...events} />;
