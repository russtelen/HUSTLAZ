import React, { useEffect, useState, useContext } from "react"
import ProductItem from "../../components/ProductItem/ProductItem"
import ProductDetail from "../../components/ProductDetail/ProductDetail"
import { UserContext } from "../../context/UserContext"
import { useParams } from "react-router-dom"
import { getAllUserFavourites, removeUserFavourite } from "../../network"
import Modal from "@material-ui/core/Modal"
import Backdrop from "@material-ui/core/Backdrop"
import Fade from "@material-ui/core/Fade"
import { makeStyles } from "@material-ui/core/styles"

const useStyles = makeStyles(() => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
}))

const ProductsPage = () => {
  const classes = useStyles()

  // State Variables
  const { user } = useContext(UserContext)
  const [favouritePosts, setFavouritePosts] = useState([])
  const [postDetail, setPostDetail] = useState({})
  const [open, setOpen] = useState(false)
  const [didChange, setDidChange] = useState(false)

  // ===================================================
  // On load
  // Set post === category in the params
  // if != category in params, set post === all post
  useEffect(() => {
    ;(async () => {
      setDidChange(false)
      const res = await getAllUserFavourites(user.username)
      setDidChange(true)
      setFavouritePosts(res)
    })()
  }, [])
  // ===================================================

  // Handlers
  const cardCliked = (post) => {
    setPostDetail(post)
    setOpen(true)
  }

  const likeCliked = async ({ postingId }) => {
    await removeUserFavourite(postingId)
    const res = await getAllUserFavourites(user.username)
    setFavouritePosts(res)
  }

  const contactClicked = () => {
    console.log("contact seller")
  }

  return (
    <div className="container">
      <h1 className="text-center mt-5">My Favourite Items</h1>
      <div className="row d-flex justify-content-center ">
        {favouritePosts?.map((post, idx) => (
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
              cardClicked={() => cardCliked(post)}
              likeClicked={(data) => likeCliked(data)}
              contactClicked={() => contactClicked()}
              favourite={true}
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
              isAuthorized={false}
            />
          </Fade>
        </Modal>
      </div>
    </div>
  )
}

export default ProductsPage
