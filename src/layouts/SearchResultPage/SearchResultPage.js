import React, { useState, useEffect, useContext, useRef } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { searchPostings } from '../../network'
import ProductItem from '../../components/ProductItem/ProductItem'
import { makeStyles } from '@material-ui/core/styles'
import ProductDetail from '../../components/ProductDetail/ProductDetail'
import { UserContext } from '../../context/UserContext'
import { PageCountContext } from '../../context/PageCountContext'
import {
  getAllUserFavourites,
  removeUserFavourite,
  addUserFavourite,
} from '../../network'
import Modal from '@material-ui/core/Modal'
import Backdrop from '@material-ui/core/Backdrop'
import Fade from '@material-ui/core/Fade'
import {
  IconButton,
  Select,
  TextField,
  MenuItem,
  InputLabel,
  FormControl,
} from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search'
import { paginate } from '../../utils/utils'
import Pagination from '@material-ui/lab/Pagination'
import toastr from 'toastr'

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchInput: {
    width: 250,
  },
  margin: {
    margin: theme.spacing(1),
  },
  noPostingsCont: {
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  priceFormControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}))

export default function SearchResultPage() {
  const classes = useStyles()
  const history = useHistory()
  const [didChange, setDidChange] = useState(false)
  const [foundPosts, setFoundPosts] = useState([])
  const { query } = useParams()

  const { user } = useContext(UserContext)

  const { pageCount, setPageCount } = useContext(PageCountContext)
  const setPageCountReference = useRef(() => {})
  setPageCountReference.current = setPageCount
  // Local state
  const [postDetail, setPostDetail] = useState({})
  const [open, setOpen] = useState(false)
  const [searchValue, setSearchValue] = useState('')
  const [favouritePosts, setFavouritePosts] = useState([])
  const [priceFilterArray, setPriceFilterArray] = useState([])
  const [priceFilterValue, setPriceFilterValue] = useState('')
  const priceFilterValueRef = useRef(() => {})
  priceFilterValueRef.current = priceFilterValue
  const usernameRef = useRef(() => {})
  usernameRef.current = user ? user.username : ''

  const handlePageChange = async (e) => {
    let found = await searchPostings(query)

    if (priceFilterArray.length > 0 && priceFilterValueRef.current !== "0") {  
      found = found.filter(post => post.price >= priceFilterArray[0] && post.price <= priceFilterArray[1])
      found.sort((a, b) => a.price - b.price)
    }

    setDidChange(false)
    setFoundPosts(paginate(found, 6, e.target.innerText))
    setDidChange(true)
  }

  const cardCliked = (post) => {
    setPostDetail(post)
    setOpen(true)
  }

  const contactClicked = () => {
    console.log('contact seller')
  }

  const likeCliked = async ({ postingId, liked }) => {
    if (liked) {
      try {
        await removeUserFavourite(postingId)
        toastr['success'](`Item successfully removed from saved items`)
      } catch (e) {
        toastr['error'](`${e.message}`)
        console.log(e)
      }
    } else {
      try {
        await addUserFavourite(user.username, postingId)
        toastr['success'](`Item successfully added to saved items`)
      } catch (e) {
        toastr['error'](`${e.message}`)
        console.log(e)
      }
    }
  }

  const checkFavourite = (postId) => {
    const found = favouritePosts.some((fav) => fav.id === postId)
    return found
  }

  const handleSearch = async (e) => {
    e.preventDefault()
    setSearchValue('')
    history.push(`/search/${searchValue}`)
  }

  const handlePriceFilterChange = (event) => {
    const str = event.target.value.toString()
    setPriceFilterArray(str.split('-'))
    setPriceFilterValue(event.target.value)
  }

  useEffect(() => {
    ;(async () => {
      setDidChange(false)
      let found = await searchPostings(query)
      if (priceFilterArray.length > 0 && priceFilterValueRef.current !== "0") {  
        found = found.filter(post => post.price >= priceFilterArray[0] && post.price <= priceFilterArray[1])
        found.sort((a, b) => a.price - b.price)
      }
      setPageCountReference.current(Math.ceil(found.length / 6))
      const page1 = paginate(found, 6, 1)
      setDidChange(true)
      setFoundPosts(page1)

      if (usernameRef.current) {
        const res = await getAllUserFavourites(usernameRef.current)
        setFavouritePosts(res)
      }
    })()
    console.log('rendered')
  }, [query, priceFilterArray])

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
        <h1 className="text-center mt-5">Results for "{query}"</h1>
      </div>
      {foundPosts.length > 0 ? (
        <div className="row d-flex justify-content-center ">
          {foundPosts.map((foundPost, idx) => (
            <div
              key={idx}
              className={
                didChange
                  ? 'col-sm-12 col-md-4 mt-5 animate__animated animate__fadeIn animate__faster'
                  : ''
              }
            >
              <ProductItem
                post={{ ...foundPost }}
                cardClicked={() => cardCliked(foundPost)}
                likeClicked={(data) => likeCliked(data)}
                contactClicked={() => contactClicked()}
                favourite={checkFavourite(foundPost.id)}
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
