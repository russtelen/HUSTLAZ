import React, { useContext, useEffect } from "react";
import SideMenu from "../../components/SideMenu/SideMenu";
import { PostsContext } from "../../context/PostsContext";
import { useHistory, useParams } from "react-router-dom";
import axios from "axios";
import useLocalStorage from "react-use-localstorage";

const SideMenuPage = () => {
  const history = useHistory();
  const topPicksClicked = async () => {
    history.push("/posts");
  };

  const topsCatClicked = async () => {
    history.push("/posts/1");
  };

  const bottomsCatClicked = async () => {
    history.push("/posts/2");
  };

  const shoesCatClicked = async () => {
    history.push("/posts/3");
  };

  const miscCatClicked = () => {
    history.push("/posts/4");
    console.log("Misc Category");
  };

  const itemsCatClicked = async () => {
    history.push("/posts/5");
  };

  const sellSomethingClicked = () => {
    history.push("/newPost");
    console.log("Sell Form");
  };

  const searchClicked = () => {
    console.log("Search");
  };

  const loginClicked = () => {
    console.log("Login form");
  };

  const registerClicked = () => {
    console.log("Register form");
  };

  const logoutClicked = () => {
    console.log("Logout User");
  };
  return (
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
  );
};

export default SideMenuPage;
