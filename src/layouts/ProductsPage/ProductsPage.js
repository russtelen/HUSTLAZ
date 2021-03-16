import React, { useEffect, useState, useContext } from "react";
import ProductItem from "../../components/ProductItem/ProductItem";
import ProductDetail from "../../components/ProductDetail/ProductDetail";
import { PostsContext } from "../../context/PostsContext";
import { useParams } from "react-router-dom";
import { getAll, getPostingsByCategory } from "../../network";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { makeStyles } from "@material-ui/core/styles";
import { IconButton, TextField, FormControl, Input, InputAdornment } from "@material-ui/core";
import { searchPostings } from '../../network'
import SearchIcon from '@material-ui/icons/Search';


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
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }
}));

const ProductsPage = () => {
  const classes = useStyles();
  // Context
  const { posts, setPosts } = useContext(PostsContext);

  // Local state
  const [postDetail, setPostDetail] = useState({});
  const [open, setOpen] = useState(false);
  const [didChange, setDidChange] = useState(false);
  const [category, setCategory] = useState("");
  const [searchValue, setSearchValue] = useState('');

  // Params :category
  const { categoryId } = useParams();

  // ===================================================
  // On load
  // Set post === category in the params
  // if != category in params, set post === all post
  useEffect(() => {
    (async () => {
      if (categoryId !== undefined) {
        const data = await getPostingsByCategory(categoryId);
        setDidChange(false);
        setPosts(data);
        setDidChange(true);
        return;
      }

      setDidChange(false);
      const allPosts = await getAll();
      setDidChange(true);
      setPosts(allPosts);
    })();

    const categories = ["none", "Tops", "Bottoms", "Shoes", "Items", "Misc"];

    setCategory(categoryId ? categories[categoryId] : "All Posts");
  }, [categoryId]);
  // ===================================================

  // Handlers
  const cardCliked = (post) => {
    setPostDetail(post);
    setOpen(true);
  };

  const likeCliked = (data) => {
    // user can unlike the posting
    // const res = await addUserFavourite(data) = data is going to be the req body comes from the product item component
    // user can like the posting
    // const res = await removeUserFavourite(data) = data is going to be postingId
  };

  const contactClicked = () => {
    console.log("contact seller");
  };

  const handleSearch = async (e) => {
    e.preventDefault()
    const res = await searchPostings(searchValue)
    setPosts(res)
    setSearchValue('')
  }

  return (
    <div className="container">
      <div className="row d-flex justify-content-around align-items-center">
        <h1 className="text-center mt-5">{category}</h1>
        <form className="mt-5" onSubmit={handleSearch} noValidate autoComplete="off">
          <TextField
          InputProps={{
            startAdornment:
            <IconButton onClick={handleSearch}><SearchIcon/></IconButton>,
            classes: {
              adornedEnd: classes.adornedStart
            }
          }}
            className={classes.searchInput}
            onChange={(e) => setSearchValue(e.target.value)}
            value={searchValue}
            id="search-input" 
            label="Search by user or title" 
            variant="outlined" />
        </form>
      </div>
      {posts.length > 0 ?
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
      : 
      <div className={classes.noPostingsCont}>
        <h1>No postings!</h1>
      </div>
      }
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
  );
};

export default ProductsPage;
