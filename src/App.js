import React, { useState, useEffect, useMemo } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import useLocalStorage from "react-use-localstorage";
import jwtDecode from "jwt-decode";

import PageHeader from "./layouts/PageHeader/PageHeader";
import DashBoardPage from "./layouts/DashBoardPage/DashBoardPage";
import { PostsContext } from "./context/PostsContext";
import { TopNavValueContext } from "./context/TopNavValueContext";
import { UserContext } from "./context/UserContext";
import { LoginFormContext } from "./context/LoginFormContext";
import { fakePosts, topPicks } from "./fakeDb";
import config from "./config.json";

import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import { EditPostContext } from "./context/EditPostContext";

const THEME = createMuiTheme({
  typography: {
    fontFamily: `'Rock Salt', cursive;`,
    fontSize: 13,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
  },
});

function App() {
  const [lastAuthUser, setLastAuthUser] = useLocalStorage(
    `CognitoIdentityServiceProvider.${config.cognito.APP_CLIENT_ID}.LastAuthUser`
  );
  const [token, setToken] = useLocalStorage(
    `CognitoIdentityServiceProvider.61bn1juvbshul8k0850o6s5b7b.${lastAuthUser}.accessToken`
  );

  const [posts, setPosts] = useState([]);
  const value = useMemo(() => ({ posts, setPosts }), [posts, setPosts]);

  const [topnavValue, setTopnavValue] = useState([]);
  const topnavValueContext = useMemo(() => ({ topnavValue, setTopnavValue }), [
    topnavValue,
    setTopnavValue,
  ]);
  const [tabValue, setTabValue] = useState([]);
  const tabValueContext = useMemo(() => ({ tabValue, setTabValue }), [
    tabValue,
    setTabValue,
  ]);
  const [user, setUser] = useState([]);
  const userValueContext = useMemo(() => ({ user, setUser }), [user, setUser]);

  const [editPost, setEditPost] = useState({});
  const editPostContext = useMemo(() => ({ editPost, setEditPost }), [
    editPost,
    setEditPost,
  ]);

  useEffect(() => {
    setPosts(topPicks);

    if (!token) {
      return;
    }
    const currentUser = token ? jwtDecode(token) : null;
    console.log(token);
    console.log(currentUser);
    setUser(currentUser);
  }, []);

  return (
    <ThemeProvider theme={THEME}>
      <Router>
        <UserContext.Provider value={userValueContext}>
          <LoginFormContext.Provider value={tabValueContext}>
            <PostsContext.Provider value={value}>
              <TopNavValueContext.Provider value={topnavValueContext}>
                <EditPostContext.Provider value={editPostContext}>
                  <PageHeader />
                  <DashBoardPage />
                </EditPostContext.Provider>
              </TopNavValueContext.Provider>
            </PostsContext.Provider>
          </LoginFormContext.Provider>
        </UserContext.Provider>
      </Router>
    </ThemeProvider>
  );
}

export default App;
