import React, { useContext, useEffect } from "react";
import { Route, Switch, useHistory } from "react-router-dom";

import { PostsContext } from "../../context/PostsContext";

import ProductsPage from "../ProductsPage/ProductsPage";
import SideMenuPage from "../SideMenuPage/SideMenuPage";
import NewPostingPage from "../NewPostingPage/NewPostingPage";

// import { fakePosts, topPicks } from "../../fakeDb";

import axios from "axios";

const DashBoardPage = () => {
  const { posts, setPosts } = useContext(PostsContext);
  const history = useHistory();

  useEffect(() => {
    (async () => {
      const res = await axios.get(
        "https://e725t6sisd.execute-api.us-west-1.amazonaws.com/prod/postings"
      );

      const allPosts = await res.data.body;
      setPosts(allPosts);
    })();
  }, []);

  const topPicksClicked = async () => {
    const res = await axios.get(
      "https://e725t6sisd.execute-api.us-west-1.amazonaws.com/prod/postings/category/1"
    );
    const topPicks = await res.data;
    history.push("/posts/topPicks");
    setPosts(topPicks);
    console.log(topPicks);
    console.log("Top Picks");
  };

  const topsCatClicked = async () => {
    const res = await axios.get(
      "https://e725t6sisd.execute-api.us-west-1.amazonaws.com/prod/postings/category/1"
    );
    const tops = await res.data;
    history.push("/posts/tops");
    setPosts(tops);
    console.log("Tops Category");
  };

  const bottomsCatClicked = async () => {
    const res = await axios.get(
      "https://e725t6sisd.execute-api.us-west-1.amazonaws.com/prod/postings/category/3"
    );
    const bottoms = await res.data;
    history.push("/posts/bottoms");
    setPosts(bottoms);
    console.log("Bottoms Category");
  };

  const shoesCatClicked = async () => {
    const res = await axios.get(
      "https://e725t6sisd.execute-api.us-west-1.amazonaws.com/prod/postings/category/2"
    );
    const shoes = await res.data;

    history.push("/posts/shoes");
    setPosts(shoes);
    console.log("Shoes Category");
  };

  const itemsCatClicked = async () => {
    const res = await axios.get(
      "https://e725t6sisd.execute-api.us-west-1.amazonaws.com/prod/postings/category/5"
    );
    const items = await res.data;
    history.push("/posts/items");
    setPosts(items);
    console.log("Items Category");
  };

  const miscCatClicked = () => {
    history.push("/posts/misc");
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
    <div style={{ display: "flex" }}>
      <SideMenuPage
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
      <Switch>
        <Route exact path="/posts">
          <ProductsPage posts={posts} />
        </Route>
        <Route exact path="/posts/:category">
          <ProductsPage posts={posts} />
        </Route>
        <Route path="/newPost">
          <NewPostingPage />
        </Route>
      </Switch>
    </div>
  );
};

export default DashBoardPage;
