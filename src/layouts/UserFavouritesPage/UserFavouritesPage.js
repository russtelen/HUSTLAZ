import React, { useEffect, useState, useContext } from "react";
import ProductItem from "../../components/ProductItem/ProductItem";
import ProductDetail from "../../components/ProductDetail/ProductDetail";
import { UserContext } from "../../context/PostsContext";
import { useParams } from "react-router-dom";
import { getAll, getPostingsByCategory } from "../../network";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
}));

const ProductsPage = () => {
  const classes = useStyles();

  // State Variables
  const { user } = useContext(UserContext);
  const [favouritePosts, setFavouritePosts] = useState([]);
  const [postDetail, setPostDetail] = useState({});
  const [open, setOpen] = useState(false);
  const [didChange, setDidChange] = useState(false);
  const [category, setCategory] = useState("");

  // Params :category
  const { categoryId } = useParams();

  // ===================================================
  // On load
  // Set post === category in the params
  // if != category in params, set post === all post
  useEffect(() => {
    (async () => {
      if (categoryId !== undefined) {
        // const res = await getAllUserFavourites(user)
        setDidChange(false);
        //setFavouritePosts(res)
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
    // Inside of this page user can only unlike a page
    // const res = await removeUserFavourite(data) = data is going to be postingId
    // fetch data again from the database to update ui
  };

  const contactClicked = () => {
    console.log("contact seller");
  };

  return (
    <div className="container">
      <h1 className="text-center mt-5">{category}</h1>
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
  );
};

export default ProductsPage;
