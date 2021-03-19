import React, { useState, createContext, useMemo } from "react"

export const LoginFormContext = createContext(0)

export const LoginFormProvider = ({ children }) => {
  const [tabValue, setTabValue] = useState([])
  const tabValueContext = useMemo(() => ({ tabValue, setTabValue }), [
    tabValue,
    setTabValue,
  ])

  return (
    <LoginFormContext.Provider value={tabValueContext}>
      {children}
    </LoginFormContext.Provider>
  )
}
