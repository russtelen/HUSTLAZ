import React from "react"
import { PostsProvider } from "./PostsContext"
import { PageCountProvider } from "./PageCountContext"
import { TopNavValueProvider } from "./TopNavValueContext"
import { LoginFormProvider } from "./LoginFormContext"
import { EditPostProvider } from "./EditPostContext"
import { UserProvider } from "./UserContext"

const ContextProvider = ({ children }) => {
  return (
    <PageCountProvider>
      <LoginFormProvider>
        <PostsProvider>
          <TopNavValueProvider>
            <UserProvider>
              <EditPostProvider>{children}</EditPostProvider>
            </UserProvider>
          </TopNavValueProvider>
        </PostsProvider>
      </LoginFormProvider>
    </PageCountProvider>
  )
}

export default ContextProvider
