import React, { useState, useEffect, useMemo } from "react"
import { BrowserRouter as Router } from "react-router-dom"

import PageHeader from "./layouts/PageHeader/PageHeader"
import DashBoardPage from "./layouts/DashBoardPage/DashBoardPage"
import { PostsContext } from "./context/PostsContext"
import { TopNavValueContext } from "./context/TopNavValueContext"
import { UserContext } from "./context/UserContext"
import { LoginFormContext } from "./context/LoginFormContext"
import { fakePosts, topPicks } from "./fakeDb"

import { createMuiTheme } from "@material-ui/core/styles"
import { ThemeProvider } from "@material-ui/styles"

const THEME = createMuiTheme({
  typography: {
    fontFamily: `'Rock Salt', cursive;`,
    fontSize: 13,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
  },
})

function App() {
  const [posts, setPosts] = useState([])
  const value = useMemo(() => ({ posts, setPosts }), [posts, setPosts])

  const [topnavValue, setTopnavValue] = useState([])
  const topnavValueContext = useMemo(() => ({ topnavValue, setTopnavValue }), [
    topnavValue,
    setTopnavValue,
  ])
  const [tabValue, setTabValue] = useState([])
  const tabValueContext = useMemo(() => ({ tabValue, setTabValue }), [
    tabValue,
    setTabValue,
  ])
  const [user, setUser] = useState([])
  const userValueContext = useMemo(() => ({ user, setUser }), [user, setUser])

  useEffect(() => {
    setPosts(topPicks)
  }, [])

  return (
    <ThemeProvider theme={THEME}>
      <Router>
        <UserContext.Provider value={userValueContext}>
          <LoginFormContext.Provider value={tabValueContext}>
            <PostsContext.Provider value={value}>
              <TopNavValueContext.Provider value={topnavValueContext}>
                <PageHeader />
                <DashBoardPage />
              </TopNavValueContext.Provider>
            </PostsContext.Provider>
          </LoginFormContext.Provider>
        </UserContext.Provider>
      </Router>
    </ThemeProvider>
  )
}

export default App
