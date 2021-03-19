import React, { useState, createContext, useMemo } from "react"

export const EditPostContext = createContext()

export const EditPostProvider = ({ children }) => {
  const [editPost, setEditPost] = useState({})
  const value = useMemo(() => ({ editPost, setEditPost }), [
    editPost,
    setEditPost,
  ])

  return (
    <EditPostContext.Provider value={value}>
      {children}
    </EditPostContext.Provider>
  )
}
