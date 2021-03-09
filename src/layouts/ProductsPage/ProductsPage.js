import React, { useEffect, useState, useContext } from "react"
import ProductItem from "../../components/ProductItem/ProductItem"
import ProductDetail from "../../components/ProductDetail/ProductDetail"
import { PostsContext } from "../../context/PostsContext"
import { useParams } from "react-router-dom"
import { getAll, getOne, getPostingsByCategory } from "../../network"
import Modal from "@material-ui/core/Modal"
import Backdrop from "@material-ui/core/Backdrop"
import Fade from "@material-ui/core/Fade"
import { makeStyles } from "@material-ui/core/styles"

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}))

const fakePost = {
  PostingId: "1",
  UserId: "1",
  title: "Tesla Roadster",
  price: 200000,
  imageUrl: "https://cdn.motor1.com/images/mgl/Yp07j/s1/tesla-pricing-lead.jpg",
  desc:
    "Elon Musk's new baby. Lorem ipsum dolor sit amet consectetur adipisicing elit.",
  datePosted: Date.now(),
  city: "Vancouver, BC",
}

const ProductsPage = () => {
  const classes = useStyles()
  // Context
  const { posts, setPosts } = useContext(PostsContext)

  // Local State
  const [postDetail, setPostDetail] = useState({})

  const [open, setOpen] = useState(false)

  const handleClose = () => {
    setOpen(false)
  }
  // Params :category
  const { categoryId, postingId } = useParams()

  // ===================================================
  // On load
  // Set post === category in the params
  // if != category in params, set post === all post
  useEffect(() => {
    ;(async () => {
      if (categoryId != undefined) {
        const data = await getPostingsByCategory(categoryId)
        setPosts(data)
        return
      }

      const allPosts = await getAll()
      setPosts(allPosts)
    })()
  }, [categoryId])
  // ===================================================

  // Handlers
  const cardCliked = async (post) => {
    // have all the info we need
    setPostDetail(post)
    // set the data in a local state
    setOpen(true)
  }

  const closeClicked = () => {
    setOpen(false)
  }

  const likeCliked = () => {
    console.log("product saved")
  }

  const contactClicked = () => {
    console.log("contact seller")
  }

  // bring in material backdrop,

  // Product detail page should be visible on click

  return (
    <div className="container">
      <h1 className="text-center mt-5">{posts[0]?.category}</h1>
      <div className="row d-flex justify-content-center">
        {posts?.map((post) => (
          <div className="col-4 mt-5">
            <ProductItem
              post={{ ...post }}
              cardClicked={() => cardCliked(post)}
              likeClicked={() => likeCliked()}
              contactClicked={() => contactClicked()}
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
          onClose={handleClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={open}>
            <ProductDetail
              post={{ ...postDetail }}
              closeClicked={() => closeClicked()}
            />
          </Fade>
        </Modal>
      </div>
    </div>
  )
}

export default ProductsPage
