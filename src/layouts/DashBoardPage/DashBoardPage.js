import React from "react";
import { Route, Switch } from "react-router-dom";

import ProductsPage from "../ProductsPage/ProductsPage";
import SideMenuPage from "../SideMenuPage/SideMenuPage";
import NewPostingPage from "../NewPostingPage/NewPostingPage";

const DashBoardPage = () => {
  const posts = JSON.parse(window.localStorage.getItem("posts"));

  return (
    <div style={{ display: "flex" }}>
      <SideMenuPage />
      <Switch>
        <Route path="/posts">
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
