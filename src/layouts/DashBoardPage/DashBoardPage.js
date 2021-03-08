import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import ProductsPage from "../ProductsPage/ProductsPage";
import SideMenuPage from "../SideMenuPage/SideMenuPage";
import NewPostingPage from "../NewPostingPage/NewPostingPage";

const DashBoardPage = () => {
  return (
    <div style={{ display: "flex" }}>
      <SideMenuPage />
      <Switch>
        <Route exact path="/">
          <Redirect to="/posts" />
        </Route>
        <Route exact path="/posts">
          <ProductsPage />
        </Route>
        <Route exact path="/posts/:categoryId">
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
