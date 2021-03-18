import React, { useEffect, useState, useContext, useRef } from "react"
import ProductItem from "../../components/ProductItem/ProductItem"
import ProductDetail from "../../components/ProductDetail/ProductDetail"
import { PostsContext } from "../../context/PostsContext"
import { UserContext } from "../../context/UserContext"
import { PageCountContext } from "../../context/PageCountContext"
import { useParams, useHistory } from "react-router-dom"
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
import { IconButton, Select, TextField, MenuItem, InputLabel, FormControl} from "@material-ui/core"
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
  priceFormControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}))

const ProductsPage = () => {
  const classes = useStyles()
  const history = useHistory()
  // Context
  const { posts, setPosts } = useContext(PostsContext)
  const { user } = useContext(UserContext)

  const { pageCount, setPageCount } = useContext(PageCountContext)
  const setPostsReference = useRef(() => {})
  setPostsReference.current = setPosts
  const setPageCountReference = useRef(() => {})
  setPageCountReference.current = setPageCount
  // Local state
  const [postDetail, setPostDetail] = useState({})
  const [open, setOpen] = useState(false)
  const [didChange, setDidChange] = useState(false)
  const [category, setCategory] = useState("")
  const [searchValue, setSearchValue] = useState("")
  const [favouritePosts, setFavouritePosts] = useState([])
  const [priceFilterArray, setPriceFilterArray] = useState([])
  const [priceFilterValue, setPriceFilterValue] = useState("")
  const priceFilterValueRef = useRef(() => {})
  priceFilterValueRef.current = priceFilterValue

  // Params :category
  const { categoryId } = useParams()

  const usernameRef = useRef(() => {})
  usernameRef.current = user ? user.username : ""
  // ===================================================
  // On load
  // Set post === category in the params
  // if != category in params, set post === all post
  useEffect(() => {
    ;(async () => {
      if (categoryId !== undefined) {
        let postsByCategory = await getPostingsByCategory(categoryId)

        if (priceFilterArray.length > 0 && priceFilterValueRef.current !== "0") {  
          postsByCategory = postsByCategory.filter(post => post.price >= priceFilterArray[0] && post.price <= priceFilterArray[1])
          postsByCategory.sort((a, b) => a.price - b.price)
        }

        setPageCountReference.current(Math.ceil(postsByCategory.length / 6))
        const page1 = paginate(postsByCategory, 6, 1)
        setDidChange(false)
        setPostsReference.current(page1)
        setDidChange(true)
        return
      }

      setDidChange(false)
      let allPosts = await getAll()

      if (priceFilterArray.length > 0 && priceFilterValueRef.current !== "0") {  
        allPosts = allPosts.filter(post => post.price >= priceFilterArray[0] && post.price <= priceFilterArray[1])
        allPosts.sort((a, b) => a.price - b.price)
      }

      setPageCountReference.current(Math.ceil(allPosts.length / 6))
      const page1 = paginate(allPosts, 6, 1)
      setDidChange(true)
      setPostsReference.current(page1)

      if (usernameRef.current) {
        const res = await getAllUserFavourites(usernameRef.current)
        setFavouritePosts(res)
      }
    })()

    const categories = ["none", "Tops", "Bottoms", "Shoes", "Items", "Misc"]

    setCategory(categoryId ? categories[categoryId] : "All Posts")
    console.log('rendered')
  }, [categoryId, priceFilterArray])
  // ===================================================

  // Handlers

  const handlePageChange = async (e) => {
    if (categoryId !== undefined) {
      let postsByCategory = await getPostingsByCategory(categoryId)

      if (priceFilterArray.length > 0 && priceFilterValue !== "0") {  
        postsByCategory = postsByCategory.filter(post => post.price >= priceFilterArray[0] && post.price <= priceFilterArray[1])
        postsByCategory.sort((a, b) => a.price - b.price)
      }

      setDidChange(false)
      setPosts(paginate(postsByCategory, 6, e.target.innerText))
      setDidChange(true)
      return
    }

    let allPosts = await getAll()

    if (priceFilterArray.length > 0 && priceFilterValue !== "0") {  
      allPosts = allPosts.filter(post => post.price >= priceFilterArray[0] && post.price <= priceFilterArray[1])
      allPosts.sort((a, b) => a.price - b.price)
    }

    setDidChange(false)
    setPosts(paginate(allPosts, 6, e.target.innerText))
    setDidChange(true)
  }

  const cardCliked = (post) => {
    setPostDetail(post)
    setOpen(true)
  }

  const likeCliked = async ({ postingId, liked }) => {
    if (!user) {
      toastr["error"]("You need to be logged in to do that")
      return
    }
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
    if (!user) {
      return false
    }
    const found = favouritePosts.some((fav) => fav.id === postId)
    return found
  }

  const contactClicked = () => {
    console.log("contact seller")
  }

  const handleSearch = async (e) => {
    e.preventDefault()
    setSearchValue("")
    history.push(`/search/${searchValue}`)
  }

  const handlePriceFilterChange = (event) => {
    const str = event.target.value.toString()
    setPriceFilterArray(str.split("-"))
    setPriceFilterValue(event.target.value)
  }

  return (
    <div className="container">
      <div className="col">
        <div className="row justify-content-center align-items-center mt-5">
        <FormControl variant="outlined" className={classes.priceFormControl}>
          <InputLabel id="price-filter-label">Price</InputLabel>
          <Select
            labelId="price-filter-label"
            id="price-filter"
            value={priceFilterValue}
            onChange={handlePriceFilterChange}
            >
              <MenuItem value="0">
                <em>None</em>
              </MenuItem>
              <MenuItem value={`0-100`}>$0-$100</MenuItem>
              <MenuItem value={`100-500`}>$100-$500</MenuItem>
              <MenuItem value={`500-1000`}>$500-$1000</MenuItem>
              <MenuItem value={`1000`}>$1000+</MenuItem>
            </Select>
          </FormControl>
          
        <form
          // className="mt-5"
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
      <h1 className="text-center mt-5">{category}</h1>
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
                isAuthorized={user}
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
