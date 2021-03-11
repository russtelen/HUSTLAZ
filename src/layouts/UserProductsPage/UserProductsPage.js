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

  const { setEditPost } = useContext(EditPostContext);
  const { user } = useContext(UserContext);
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

  const editClicked = async (post) => {
    const res = await getOne(post.id);
    setEditPost(res);
    history.push(`/dashboard/editposting/${post.id}`);
  };

  const deleteClicked = async (post) => {
    try {
      const deleteRes = await deleteOne(post.id);
      const res = await getAllUserPostings(user.username);
      setUserPosts(res);
      setOpen(false);

      if (deleteRes) {
        toastr["success"](`Item successfully deleted`);
        return;
      }

      toastr["error"](`Something went wrong. Could not delete your post`);
    } catch (e) {
      toastr["error"](`${e.message}`);
      console.log(e);
    }
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
              editClicked={() => editClicked(postDetail)}
              deleteClicked={() => deleteClicked(postDetail)}
              isAuthorized={true}
            />
          </Fade>
        </Modal>
      </div>
    </div>
  );
};

export default UserProductsPage;
