import React from "react"
import { actions } from "@storybook/addon-actions"
import SideMenuUser from "./SideMenuUser"

export default {
  title: "SideMenuUser",
  component: SideMenuUser,
}

const events = actions({
  favouritesClicked: "favouritesClicked",
  profileClicked: "profileClicked",
  myPostingsClicked: "myPostingsClicked",
  sellSomethingClicked: "sellSomethingClicked",
  searchClicked: "searchClicked",
})

export const Default = () => (
  <SideMenuUser events={events} user={{ user_id: "213" }} />
)
