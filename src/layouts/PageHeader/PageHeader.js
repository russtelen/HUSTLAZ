import React, { useContext } from "react"
import TopNav from "../../components/TopNav/TopNav"
// import { getAll } from "../../network"
// import { PageCountContext } from "../../context/PageCountContext"
// import { PostsContext } from "../../context/PostsContext"
import { useHistory } from "react-router-dom"
import { UserContext } from "../../context/UserContext"
import { TopNavValueContext } from "../../context/TopNavValueContext"
// import { paginate } from "../../utils/utils"
import toastr from "toastr"

const PageHeader = () => {
  const { user } = useContext(UserContext)
  // const { setPosts } = useContext(PostsContext)
  // const { setPageCount } = useContext(PageCountContext)
  const { setTopnavValue } = useContext(TopNavValueContext)
  const history = useHistory()

  const homeClicked = async () => {
    // const allPosts = await getAll()
    // setPageCount(Math.ceil(allPosts.length / 6))
    setTopnavValue("home")
    // setPosts(paginate(allPosts, 6, 1))
    history.push("/posts")
  }

  const profileClicked = () => {
    if (!user?.username) {
      toastr["error"]("You need to be logged in to do that", "Login")
    }
    setTopnavValue("profile")
    history.push("/dashboard/profile")
  }

  const notificationClicked = () => {
    setTopnavValue("notifications")
  }
  return (
    <TopNav
      homeClicked={() => homeClicked()}
      profileClicked={() => profileClicked()}
      notificationClicked={() => notificationClicked()}
    />
  )
}

export default PageHeader
