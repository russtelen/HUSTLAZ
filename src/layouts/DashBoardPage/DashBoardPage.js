import React, { useContext } from "react"
import { Route, Switch, Redirect } from "react-router-dom"
import { UserContext } from "../../context/UserContext"

import ProductsPage from "../ProductsPage/ProductsPage"
import SideMenuPage from "../SideMenuPage/SideMenuPage"
import NewPostingPage from "../NewPostingPage/NewPostingPage"
import LoginPage from "../LoginPage/LoginPage"
import UserProductsPage from "../UserProductsPage/UserProductsPage"
import EditPostingPage from "../EditPostingPage/EditPostingPage"
import VerifyEmailPage from "../VerifyEmailPage/VerifyEmailPage"
import UserDetailPage from "../UserDetailPage/UserDetailPage"
import UserFavouritesPage from "../UserFavouritesPage/UserFavouritesPage"
import FooterPage from "../FooterPage/FooterPage"

const DashBoardPage = () => {
  const { user } = useContext(UserContext)

  const PrivateRoute = ({ path, children }) => {
    return (
      <Route path={path}>
        {!!user?.username ? children : <Redirect to="/login" />}
      </Route>
    )
  }

  return (
    <div>
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
          <PrivateRoute exact path="/dashboard/profile">
            <UserDetailPage />
          </PrivateRoute>
          <PrivateRoute exact path="/dashboard/mypostings">
            <UserProductsPage />
          </PrivateRoute>
          <PrivateRoute exact path="/dashboard/editposting/:postingId">
            <EditPostingPage />
          </PrivateRoute>
          <PrivateRoute exact path="/dashboard/favourites">
            <UserFavouritesPage />
          </PrivateRoute>
          <Route exact path="/login">
            {!user?.username ? <LoginPage /> : <Redirect to="/posts" />}
          </Route>
          <Route exact path="/register">
            {!user?.username ? <LoginPage /> : <Redirect to="/posts" />}
          </Route>
          <Route exact path="/verifyEmail">
            {!user?.username ? <VerifyEmailPage /> : <Redirect to="/posts" />}
          </Route>
        </Switch>
      </div>
      <FooterPage />
    </div>
  )
}

export default DashBoardPage
