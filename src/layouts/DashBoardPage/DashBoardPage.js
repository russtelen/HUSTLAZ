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

  // useEffect(() => {
  //   (async () => {
  //     const res = await axios.get(
  //       "https://e725t6sisd.execute-api.us-west-1.amazonaws.com/prod/postings"
  //     );

  //     const allPosts = await res.data.body;
  //     setPosts(allPosts);
  //   })();
  // }, []);

  return (
    <div style={{ display: "flex" }}>
      <SideMenuPage />
      <Switch>
        <Route exact path="/posts">
          <ProductsPage />
        </Route>
        <Route exact path="/posts/:category">
          <ProductsPage />
        </Route>
        <Route path="/newPost">
          <NewPostingPage />
        </Route>
      </Switch>
    </div>
  );
};

export default DashBoardPage;
