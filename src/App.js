import React from "react"
import { BrowserRouter as Router } from "react-router-dom"
import PageHeader from "./layouts/PageHeader/PageHeader"
import DashBoardPage from "./layouts/DashBoardPage/DashBoardPage"
import { createMuiTheme } from "@material-ui/core/styles"
import { ThemeProvider } from "@material-ui/styles"
import ContextProvider from "./context/ContextProvider"

const THEME = createMuiTheme({
  typography: {
    fontFamily: `'Montserrat', sans-serif;`,
    fontSize: 18,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
  },
})

function App() {
  return (
    <Router>
      <ContextProvider>
        <ThemeProvider theme={THEME}>
          <PageHeader />
        </ThemeProvider>
        <DashBoardPage />
      </ContextProvider>
    </Router>
  )
}

export default App
