import React, { useState, createContext, useMemo } from "react"

export const PostsContext = createContext([])

export const PostsProvider = ({ children }) => {
  const [posts, setPosts] = useState([])
  const value = useMemo(() => ({ posts, setPosts }), [posts, setPosts])

  return <PostsContext.Provider value={value}>{children}</PostsContext.Provider>
}
