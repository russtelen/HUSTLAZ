import React, { useState, createContext, useMemo } from "react"
import { currentUser } from "../userAuth"

export const UserContext = createContext([])

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(currentUser())
  const userValueContext = useMemo(() => ({ user, setUser }), [user, setUser])

  return (
    <UserContext.Provider value={userValueContext}>
      {children}
    </UserContext.Provider>
  )
}
