import React, { useContext } from "react";
import SideMenu from "../../components/SideMenu/SideMenu";
import { PostsContext } from "../../context/PostsContext";
import { topPicks, tops, bottoms, shoes, items } from "../../fakeDb";
import { useHistory } from "react-router-dom";

const SideMenuPage = () => {
  const { posts, setPosts } = useContext(PostsContext);
  const history = useHistory();

  const topPicksClicked = () => {
    history.push("/posts");
    setPosts(topPicks);
    console.log("Top Picks");
  };

  const topsCatClicked = () => {
    history.push("/posts");
    setPosts(tops);
    console.log("Tops Category");
  };

  const bottomsCatClicked = () => {
    history.push("/posts");
    setPosts(bottoms);
    console.log("Bottoms Category");
  };

  const shoesCatClicked = () => {
    history.push("/posts");
    setPosts(shoes);
    console.log("Shoes Category");
  };

  const itemsCatClicked = () => {
    history.push("/posts");
    setPosts(items);
    console.log("Items Category");
  };

  const miscCatClicked = () => {
    history.push("/posts");
    console.log("Misc Category");
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
