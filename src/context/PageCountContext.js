import React, { useState, createContext, useMemo } from "react"

export const PageCountContext = createContext(0)

export const PageCountProvider = ({ children }) => {
  const [pageCount, setPageCount] = useState([])
  const pageCountValue = useMemo(() => ({ pageCount, setPageCount }), [
    pageCount,
    setPageCount,
  ])

  return (
    <PageCountContext.Provider value={pageCountValue}>
      {children}
    </PageCountContext.Provider>
  )
}
