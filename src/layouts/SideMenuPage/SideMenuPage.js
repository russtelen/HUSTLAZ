import React, { useContext } from "react"
import SideMenu from "../../components/SideMenu/SideMenu"
import SideMenuUser from "../../components/SideMenuUser/SideMenuUser"
import { TopNavValueContext } from "../../context/TopNavValueContext"

import { useHistory } from "react-router-dom"

const SideMenuPage = () => {
  const { topnavValue, setTopnavValue } = useContext(TopNavValueContext)

  const history = useHistory()
  const topPicksClicked = async () => {
    history.push("/posts")
  }

  const topsCatClicked = async () => {
    history.push("/posts/1")
  }

  const bottomsCatClicked = async () => {
    history.push("/posts/2")
  }

  const shoesCatClicked = async () => {
    history.push("/posts/3")
  }

  const miscCatClicked = () => {
    history.push("/posts/5")
  }

  const itemsCatClicked = async () => {
    history.push("/posts/4")
  }

  const sellSomethingClicked = () => {
    history.push("/newPost")
  }

  const searchClicked = () => {
    console.log("Search")
  }

  const loginClicked = () => {
    console.log("Login form")
  }

  const registerClicked = () => {
    console.log("Register form")
  }

  const logoutClicked = () => {
    console.log("Logout User")
  }
  return (
    <>
      {topnavValue === "profile" ? (
        <SideMenuUser />
      ) : (
        <SideMenu
          topPicksClicked={() => topPicksClicked()}
          topsCatClicked={() => topsCatClicked()}
          bottomsCatClicked={() => bottomsCatClicked()}
          shoesCatClicked={() => shoesCatClicked()}
          itemsCatClicked={() => itemsCatClicked()}
          miscCatClicked={() => miscCatClicked()}
          sellSomethingClicked={() => sellSomethingClicked()}
          searchClicked={() => searchClicked()}
          loginClicked={() => loginClicked()}
          registerClicked={() => registerClicked()}
          logoutClicked={() => logoutClicked()}
        />
      )}
    </>
  )
}

export default SideMenuPage
