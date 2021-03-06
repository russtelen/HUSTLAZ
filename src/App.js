import React, { useState, useEffect, useMemo } from "react";
import { BrowserRouter as Router } from "react-router-dom";

import PageHeader from "./layouts/PageHeader/PageHeader";
import DashBoardPage from "./layouts/DashBoardPage/DashBoardPage";
import { PostsContext } from "./context/PostsContext";
import { fakePosts } from "./fakeDb";

import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";

const THEME = createMuiTheme({
  typography: {
    fontFamily: `'Permanent Marker', cursive;`,
    fontSize: 13,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
  },
});

function App() {
  const [posts, setPosts] = useState([]);
  const value = useMemo(() => ({ posts, setPosts }), [posts, setPosts]);

  useEffect(() => {
    setPosts(fakePosts);
  }, []);

  return (
    <ThemeProvider theme={THEME}>
      <Router>
        <PostsContext.Provider value={value}>
          <PageHeader />
          <DashBoardPage />
        </PostsContext.Provider>
      </Router>
    </ThemeProvider>
  );
}

export default App;
