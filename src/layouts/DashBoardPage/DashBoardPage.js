import React, { useContext } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { UserContext } from "../../context/UserContext";

import ProductsPage from "../ProductsPage/ProductsPage";
import SideMenuPage from "../SideMenuPage/SideMenuPage";
import NewPostingPage from "../NewPostingPage/NewPostingPage";
import LoginPage from "../LoginPage/LoginPage";
import SideMenuUser from "../../components/SideMenuUser/SideMenuUser";
import UserProductsPage from "../UserProductsPage/UserProductsPage";
import EditPostingPage from "../EditPostingPage/EditPostingPage";

const DashBoardPage = () => {
  const { user, setUser } = useContext(UserContext);

  const PrivateRoute = ({ path, children }) => {
    return (
      <Route path={path}>
        {!!user?.username ? children : <Redirect to="/login" />}
      </Route>
    );
  };

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
        <PrivateRoute exact path="/newPost">
          <NewPostingPage />
        </PrivateRoute>
        <PrivateRoute exact path="/dashboard" />
        <PrivateRoute exact path="/dashboard/mypostings">
          <UserProductsPage />
        </PrivateRoute>
        <PrivateRoute exact path="/dashboard/editposting/:postingId">
          <EditPostingPage />
        </PrivateRoute>
        <Route exact path="/login">
          <LoginPage />
        </Route>
        <Route exact path="/register">
          <LoginPage />
        </Route>
      </Switch>
    </div>
  );
};

export default DashBoardPage;
