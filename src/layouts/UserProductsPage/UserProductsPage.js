import React, { useEffect, useState, useContext } from "react";
import { useHistory } from "react-router-dom";

import ProductItem from "../../components/ProductItem/ProductItem";
import ProductDetail from "../../components/ProductDetail/ProductDetail";
import { getAllUserPostings, getOne, deleteOne } from "../../network";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { makeStyles } from "@material-ui/core/styles";
import { EditPostContext } from "../../context/EditPostContext";
import { UserContext } from "../../context/UserContext";
import toastr from "toastr";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
}));

const UserProductsPage = () => {
  const classes = useStyles();
  const history = useHistory();

  const { editPost, setEditPost } = useContext(EditPostContext);
  const { user, setUser } = useContext(UserContext);

  const [userPosts, setUserPosts] = useState([]);
  const [postDetail, setPostDetail] = useState({});
  const [open, setOpen] = useState(false);

  useEffect(() => {
    (async () => {
      const res = await getAllUserPostings(user.username);
      setUserPosts(res);
      console.log(userPosts);
    })();
  }, []);
  // ===================================================

  // Handlers
  const cardCliked = (post) => {
    setPostDetail(post);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const closeClicked = () => {
    setOpen(false);
  };

  const likeCliked = () => {
    console.log("product saved");
  };

  const contactClicked = () => {
    console.log("contact seller");
  };

  const editClicked = async (post) => {
    const res = await getOne(post.id);
    setEditPost(res);
    history.push(`/dashboard/editposting/${post.id}`);
  };

  const deleteClicked = async (post) => {
    await deleteOne(post.id);
    const res = await getAllUserPostings(user.username);
    setUserPosts(res);
    toastr["success"](`Item successfully deleted`);
  };

  return (
    <div className="container">
      <h1 className="text-center mt-5">
        {userPosts.length > 0 ? "My Posts" : "You have no posts yet!"}
      </h1>
      {/* <h1 className="text-center mt-5">{posts[0]?.category}</h1> */}
      <div className="row d-flex justify-content-center">
        {userPosts?.map((post, idx) => (
          <div key={idx} className="col-sm-12 col-md-4 mt-5">
            <ProductItem
              post={{ ...post }}
              cardClicked={() => cardCliked(post)}
              likeClicked={() => likeCliked()}
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
              editClicked={() => editClicked()}
              deleteClicked={() => deleteClicked()}
              isAuthorized={true}
            />
          </Fade>
        </Modal>
      </div>
    </div>
  );
};

export default UserProductsPage;
