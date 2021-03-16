import React, { useState, useMemo } from "react"
import { BrowserRouter as Router } from "react-router-dom"
import PageHeader from "./layouts/PageHeader/PageHeader"
import DashBoardPage from "./layouts/DashBoardPage/DashBoardPage"
import { PostsContext } from "./context/PostsContext"
import { PageCountContext } from "./context/PageCountContext"
import { TopNavValueContext } from "./context/TopNavValueContext"
import { UserContext } from "./context/UserContext"
import { LoginFormContext } from "./context/LoginFormContext"
import { currentUser } from "./userAuth"

import { createMuiTheme } from "@material-ui/core/styles"
import { ThemeProvider } from "@material-ui/styles"
import { EditPostContext } from "./context/EditPostContext"

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

  const [pageCount, setPageCount] = useState([])
  const pageCountValue = useMemo(() => ({ pageCount, setPageCount }), [
    pageCount,
    setPageCount,
  ])

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
  const [user, setUser] = useState(currentUser())
  const userValueContext = useMemo(() => ({ user, setUser }), [user, setUser])

  const [editPost, setEditPost] = useState({})
  const editPostContext = useMemo(() => ({ editPost, setEditPost }), [
    editPost,
    setEditPost,
  ])

  return (
    <ThemeProvider theme={THEME}>
      <Router>
        <PageCountContext.Provider value={pageCountValue}>
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
        </PageCountContext.Provider>
      </Router>
    </ThemeProvider>
  )
}

export default App
