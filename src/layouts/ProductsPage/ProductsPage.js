import React, { useEffect, useState, useContext } from "react"
import ProductItem from "../../components/ProductItem/ProductItem"
import ProductDetail from "../../components/ProductDetail/ProductDetail"
import { PostsContext } from "../../context/PostsContext"
import { UserContext } from "../../context/UserContext"
import { PageCountContext } from "../../context/PageCountContext"
import { useParams } from "react-router-dom"
import {
  getAll,
  getPostingsByCategory,
  getAllUserFavourites,
  removeUserFavourite,
  addUserFavourite,
} from "../../network"
import Modal from "@material-ui/core/Modal"
import Backdrop from "@material-ui/core/Backdrop"
import Fade from "@material-ui/core/Fade"
import { makeStyles } from "@material-ui/core/styles"
import { IconButton, TextField } from "@material-ui/core"
import { searchPostings } from "../../network"
import SearchIcon from "@material-ui/icons/Search"
import { paginate } from "../../utils/utils"
import Pagination from "@material-ui/lab/Pagination"
import toastr from "toastr"

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  searchInput: {
    width: 250,
  },
  margin: {
    margin: theme.spacing(1),
  },
  noPostingsCont: {
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
}))

const ProductsPage = () => {
  const classes = useStyles()
  // Context
  const { posts, setPosts } = useContext(PostsContext)
  const { user } = useContext(UserContext)

  const { pageCount, setPageCount } = useContext(PageCountContext)
  // Local state
  const [postDetail, setPostDetail] = useState({})
  const [open, setOpen] = useState(false)
  const [didChange, setDidChange] = useState(false)
  const [category, setCategory] = useState("")
  const [searchValue, setSearchValue] = useState("")
  const [favouritePosts, setFavouritePosts] = useState([])

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
        setPageCount(Math.ceil(postsByCategory.length / 6))
        const page1 = paginate(postsByCategory, 6, 1)
        setDidChange(false)
        setPosts(page1)
        setDidChange(true)
        return
      }

      setDidChange(false)
      const allPosts = await getAll()
      setPageCount(Math.ceil(allPosts.length / 6))
      const page1 = paginate(allPosts, 6, 1)
      setDidChange(true)
      setPosts(page1)

      const res = await getAllUserFavourites(user.username)
      setFavouritePosts(res)
    })()

    const categories = ["none", "Tops", "Bottoms", "Shoes", "Items", "Misc"]

    setCategory(categoryId ? categories[categoryId] : "All Posts")
  }, [categoryId])
  // ===================================================

  // Handlers

  const handlePageChange = async (e) => {
    if (categoryId !== undefined) {
      const postsByCategory = await getPostingsByCategory(categoryId)
      setDidChange(false)
      setPosts(paginate(postsByCategory, 6, e.target.innerText))
      setDidChange(true)
      return
    }

    const allPosts = await getAll()
    setDidChange(false)
    setPosts(paginate(allPosts, 6, e.target.innerText))
    setDidChange(true)
  }

  const cardCliked = (post) => {
    setPostDetail(post)
    setOpen(true)
  }

  const likeCliked = async ({ postingId, liked }) => {
    if (liked) {
      try {
        await removeUserFavourite(postingId)
        toastr["success"](`Item successfully removed from saved items`)
      } catch (e) {
        toastr["error"](`${e.message}`)
        console.log(e)
      }
    } else {
      try {
        await addUserFavourite(user.username, postingId)
        toastr["success"](`Item successfully added to saved items`)
      } catch (e) {
        toastr["error"](`${e.message}`)
        console.log(e)
      }
    }
  }

  const checkFavourite = (postId) => {
    const found = favouritePosts.some((fav) => fav.id === postId)
    return found
  }

  const contactClicked = () => {
    console.log("contact seller")
  }

  const handleSearch = async (e) => {
    e.preventDefault()
    const res = await searchPostings(searchValue)
    setPageCount(0)
    setPosts(res)
    setSearchValue("")
  }

  return (
    <div className="container">
      <div className="row d-flex justify-content-around align-items-center">
        <h1 className="text-center mt-5">{category}</h1>
        <form
          className="mt-5"
          onSubmit={handleSearch}
          noValidate
          autoComplete="off"
        >
          <TextField
            InputProps={{
              startAdornment: (
                <IconButton onClick={handleSearch}>
                  <SearchIcon />
                </IconButton>
              ),
              classes: {
                adornedEnd: classes.adornedStart,
              },
            }}
            className={classes.searchInput}
            onChange={(e) => setSearchValue(e.target.value)}
            value={searchValue}
            id="search-input"
            label="Search by user or title"
            variant="outlined"
          />
        </form>
      </div>
      {posts.length > 0 ? (
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
                likeClicked={(data) => likeCliked(data)}
                contactClicked={() => contactClicked()}
                favourite={checkFavourite(post.id)}
              />
            </div>
          ))}
        </div>
      ) : (
        <div className={classes.noPostingsCont}>
          <h1>No postings!</h1>
        </div>
      )}
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

export default ProductsPage
