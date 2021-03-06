import React, { useContext, useEffect } from "react";
import SideMenu from "../../components/SideMenu/SideMenu";
import { PostsContext } from "../../context/PostsContext";
import { topPicks, tops, bottoms, shoes, items } from "../../fakeDb";
import { useHistory, useParams } from "react-router-dom";
import useLocalStorage from "react-use-localstorage";

const SideMenuPage = () => {
  const { posts, setPosts } = useContext(PostsContext);
  const [localPosts, setLocalPosts] = useLocalStorage("posts");

  const history = useHistory();

  useEffect(() => {
    const posts = localPosts ? JSON.parse(localPosts) : topPicks;
    setPosts(posts);
  }, [localPosts]);

  const topPicksClicked = () => {
    history.push("/posts");
    setLocalPosts(JSON.stringify(topPicks));
    console.log("Top Picks");
  };

  const topsCatClicked = () => {
    history.push("/posts");
    setLocalPosts(JSON.stringify(tops));
    console.log("Tops Category");
  };

  const bottomsCatClicked = () => {
    history.push("/posts");
    setLocalPosts(JSON.stringify(bottoms));
    console.log("Bottoms Category");
  };

  const shoesCatClicked = () => {
    history.push("/posts");
    setLocalPosts(JSON.stringify(shoes));
    console.log("Shoes Category");
  };

  const itemsCatClicked = () => {
    history.push("/posts");
    setLocalPosts(JSON.stringify(items));
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
