import React, { useState, createContext, useMemo } from "react"

export const TopNavValueContext = createContext([])

export const TopNavValueProvider = ({ children }) => {
  const [topnavValue, setTopnavValue] = useState([])
  const topnavValueContext = useMemo(() => ({ topnavValue, setTopnavValue }), [
    topnavValue,
    setTopnavValue,
  ])
  return (
    <TopNavValueContext.Provider value={topnavValueContext}>
      {children}
    </TopNavValueContext.Provider>
  )
}
