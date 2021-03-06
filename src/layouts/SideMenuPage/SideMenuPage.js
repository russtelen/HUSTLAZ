import React, { useContext } from "react";
import SideMenu from "../../components/SideMenu/SideMenu";
import { PostsContext } from "../../context/PostsContext";
import { topPicks } from "../../fakeDb";

const SideMenuPage = () => {
  const { posts, setPosts } = useContext(PostsContext);

  const topPicksClicked = () => {
    setPosts(topPicks);
    console.log("Top Picks");
  };

  const topsCatClicked = () => {
    console.log("Tops Category");
  };

  const bottomsCatClicked = () => {
    console.log("Bottoms Category");
  };

  const shoesCatClicked = () => {
    console.log("Shoes Category");
  };

  const itemsCatClicked = () => {
    console.log("Items Category");
  };

  const miscCatClicked = () => {
    console.log("Misc Category");
  };

  const sellSomethingClicked = () => {
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
