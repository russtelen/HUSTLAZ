import React from "react"
import Login from "./Login"
import { actions } from "@storybook/addon-actions"

export default {
  title: "Login",
  component: Login,
}

const events = actions({ onSubmit: "submit" })

export const Default = () => <Login {...events}></Login>
