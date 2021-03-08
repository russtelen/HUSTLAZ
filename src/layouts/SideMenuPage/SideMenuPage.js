import React, { useContext, useEffect } from "react";
import SideMenu from "../../components/SideMenu/SideMenu";
import { PostsContext } from "../../context/PostsContext";
import { useHistory, useParams } from "react-router-dom";
import axios from "axios";
import useLocalStorage from "react-use-localstorage";

const SideMenuPage = ({
  user,
  topPicksClicked,
  topsCatClicked,
  bottomsCatClicked,
  shoesCatClicked,
  itemsCatClicked,
  miscCatClicked,
  sellSomethingClicked,
  searchClicked,
  loginClicked,
  registerClicked,
  logoutClicked,
}) => {
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
