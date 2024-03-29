import React, { useEffect, useState, useContext, useRef } from "react"
import { useHistory } from "react-router-dom"

import ProductItem from "../../components/ProductItem/ProductItem"
import ProductDetail from "../../components/ProductDetail/ProductDetail"
import { getAllUserPostings, getOne, deleteOne } from "../../network"
import Modal from "@material-ui/core/Modal"
import Backdrop from "@material-ui/core/Backdrop"
import Fade from "@material-ui/core/Fade"
import { makeStyles } from "@material-ui/core/styles"
import { EditPostContext } from "../../context/EditPostContext"
import { PageCountContext } from "../../context/PageCountContext"
import { UserContext } from "../../context/UserContext"
import toastr from "toastr"
import { paginate } from "../../utils/utils"
import Pagination from "@material-ui/lab/Pagination"

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
}))

const UserProductsPage = () => {
  const classes = useStyles()
  const history = useHistory()

  const { setEditPost } = useContext(EditPostContext)
  const { user } = useContext(UserContext)
  const usernameReference = useRef(() => {})
  usernameReference.current = user.username
  const { pageCount, setPageCount } = useContext(PageCountContext)
  const setPageCountReference = useRef(() => {})
  setPageCountReference.current = setPageCount
  const [userPosts, setUserPosts] = useState([])
  const [postDetail, setPostDetail] = useState({})
  const [open, setOpen] = useState(false)
  const [didChange, setDidChange] = useState(false)

  useEffect(() => {
    ;(async () => {
      const res = await getAllUserPostings(usernameReference.current)
      console.log(res)
      const page1 = paginate(res.postings, 6, 1)
      setPageCountReference.current(Math.ceil(res.postings.length / 6))
      setDidChange(false)
      setUserPosts(page1)
      setDidChange(true)
    })()
  }, [userPosts.length])
  // ===================================================

  // Handlers
  const handlePageChange = async (e) => {
    const res = await getAllUserPostings(user.username)
    setDidChange(false)
    setUserPosts(paginate(res.postings, 6, e.target.innerText))
    setDidChange(true)
  }

  const cardClicked = (post) => {
    setPostDetail(post)
    setOpen(true)
  }

  const editClicked = async (post) => {
    const res = await getOne(post.id)
    setEditPost(res)
    history.push(`/dashboard/editposting/${post.id}`)
  }

  const deleteClicked = async (post) => {
    try {
      await deleteOne(post.id)
      const res = await getAllUserPostings(user.username)
      setUserPosts(res)
      setOpen(false)
      toastr["success"](`Item successfully deleted`)
      return
    } catch (e) {
      toastr["error"](`${e.message}`)
      console.log(e)
    }
  }

  return (
    <div className="container">
      <h1 className="text-center mt-5">
        {userPosts.length > 0 ? "My Posts" : "You have no posts yet!"}
      </h1>
      {/* <h1 className="text-center mt-5">{posts[0]?.category}</h1> */}
      <div className="row d-flex justify-content-center">
        {userPosts.length > 0 &&
          userPosts?.map((post, idx) => (
            <div
              key={idx}
              className={
                didChange
                  ? "col-sm-12 col-md-4 mt-5 animate__animated animate__fadeIn animate__faster"
                  : ""
              }
            >
              <ProductItem
                post={{ ...post }}
                cardClicked={() => cardClicked(post)}
                editClicked={() => editClicked(post)}
                deleteClicked={() => deleteClicked(post)}
                myPostings={!!post}
              />
            </div>
          ))}
      </div>
      <div>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          className={classes.modal}
          open={open}
          onClose={() => setOpen(false)}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={open}>
            <ProductDetail
              post={{ ...postDetail }}
              closeClicked={() => setOpen(false)}
              editClicked={() => editClicked(postDetail)}
              deleteClicked={() => deleteClicked(postDetail)}
              isAuthorized={true}
            />
          </Fade>
        </Modal>
      </div>
      <div className="d-flex justify-content-center mt-5">
        <Pagination
          count={pageCount}
          onChange={handlePageChange}
          hideNextButton={true}
          hidePrevButton={true}
          variant="outlined"
          shape="rounded"
          size="large"
          color="secondary"
        />
      </div>
    </div>
  )
}

export default UserProductsPage
