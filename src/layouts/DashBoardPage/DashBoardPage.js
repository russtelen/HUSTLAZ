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
import SearchResultPage from "../SearchResultPage/SearchResultPage"
import DevelopersPage from "../DevelopersPage/DevelopersPage"


import { createMuiTheme } from "@material-ui/core/styles"
import { ThemeProvider } from "@material-ui/styles"

const BODY = createMuiTheme({
  typography: {
    fontFamily: `'Montserrat', sans-serif;`,
    fontSize: 15,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
  },
})

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
        <ThemeProvider theme={BODY}>
        <Switch>
          <Route exact path="/">
            <Redirect to="/posts" />
          </Route>
          <Route exact path="/posts">
            <ProductsPage />
          </Route>
          <Route path="/search/:query">
            <SearchResultPage />
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
          <Route exact path="/developers/:name">
            <DevelopersPage />
          </Route>
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
        </ThemeProvider>
      </div>
      <FooterPage />
    </div>
  )
}

export default DashBoardPage
