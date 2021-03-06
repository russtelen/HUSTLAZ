import React from "react";
import { Route, Switch } from "react-router-dom";

import ProductsPage from "../ProductsPage/ProductsPage";
import SideMenuPage from "../SideMenuPage/SideMenuPage";
import NewPosting from "../../components/NewPosting/NewPosting";

const DashBoardPage = () => {
  return (
    <div style={{ display: "flex" }}>
      <SideMenuPage />
      <Switch>
        <Route path="/posts">
          <ProductsPage />
        </Route>
        <Route path="/newPost">
          <NewPosting />
        </Route>
      </Switch>
    </div>
  );
};

export default DashBoardPage;
