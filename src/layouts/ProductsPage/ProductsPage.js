import React, { useEffect, useState, useContext } from "react"
import ProductItem from "../../components/ProductItem/ProductItem"
import ProductDetail from "../../components/ProductDetail/ProductDetail"
import { PostsContext } from "../../context/PostsContext"
import { useParams } from "react-router-dom"
import { getAll, getPostingsByCategory } from "../../network"
import Modal from "@material-ui/core/Modal"
import Backdrop from "@material-ui/core/Backdrop"
import Fade from "@material-ui/core/Fade"
import { makeStyles } from "@material-ui/core/styles"
import { paginate } from "../../utils/utils"
import Pagination from "@material-ui/lab/Pagination"

const useStyles = makeStyles(() => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
}))

const ProductsPage = () => {
  const classes = useStyles()
  // Context
  const { posts, setPosts } = useContext(PostsContext)

  // Local state
  const [postDetail, setPostDetail] = useState({})
  const [open, setOpen] = useState(false)
  const [didChange, setDidChange] = useState(false)
  const [category, setCategory] = useState("")

  // Params :category
  const { categoryId } = useParams()

  // ===================================================
  // On load
  // Set post === category in the params
  // if != category in params, set post === all post
  useEffect(() => {
    ;(async () => {
      if (categoryId !== undefined) {
        const postsByCategory = await getPostingsByCategory(categoryId)
        const page1 = paginate(postsByCategory, 6, 1)
        setDidChange(false)
        setPosts(page1)
        setDidChange(true)
        return
      }

      setDidChange(false)
      const allPosts = await getAll()
      const page1 = paginate(allPosts, 6, 1)
      setDidChange(true)
      setPosts(page1)
    })()

    const categories = ["none", "Tops", "Bottoms", "Shoes", "Items", "Misc"]

    setCategory(categoryId ? categories[categoryId] : "All Posts")
  }, [categoryId])
  // ===================================================

  // Handlers

  const handlePageChange = async (e) => {
    if (categoryId !== undefined) {
      const postsByCategory = await getPostingsByCategory(categoryId)
      setPosts(paginate(postsByCategory, 6, e.target.innerText))
      return
    }

    const allPosts = await getAll()
    setPosts(paginate(allPosts, 6, e.target.innerText))
  }

  const cardCliked = (post) => {
    setPostDetail(post)
    setOpen(true)
  }

  const likeCliked = () => {
    console.log("product saved")
  }

  const contactClicked = () => {
    console.log("contact seller")
  }

  return (
    <div className="container">
      <h1 className="text-center mt-5">{category}</h1>
      <Pagination
        count={posts.length / 2 - 1}
        onChange={handlePageChange}
        hideNextButton={true}
        hidePrevButton={true}
        variant="outlined"
        shape="rounded"
        size="large"
        color="secondary"
      />
      <div className="row d-flex justify-content-center ">
        {posts?.map((post, idx) => (
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
