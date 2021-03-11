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

const useStyles = makeStyles(() => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
}));

const ProductsPage = () => {
  const classes = useStyles();
  // Context
  const { posts, setPosts } = useContext(PostsContext);

  // Local state
  const [postDetail, setPostDetail] = useState({});
  const [open, setOpen] = useState(false);

  // Params :category
  const { categoryId } = useParams();

  // ===================================================
  // On load
  // Set post === category in the params
  // if != category in params, set post === all post
  useEffect(() => {
    (async () => {
      if (categoryId != undefined) {
        const data = await getPostingsByCategory(categoryId);
        setPosts(data);
        return;
      }

      const allPosts = await getAll();
      setPosts(allPosts);
    })();
  }, [categoryId]);
  // ===================================================

  // Handlers
  const cardCliked = (post) => {
    setPostDetail(post);
    setOpen(true);
  };

  const likeCliked = () => {
    console.log("product saved");
  };

  const contactClicked = () => {
    console.log("contact seller");
  };

  return (
    <div className="container">
      <h1 className="text-center mt-5">{posts[0]?.category}</h1>
      <div className="row d-flex justify-content-center">
        {posts?.map((post, idx) => (
          <div key={idx} className="col-sm-12 col-md-4 mt-5">
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
