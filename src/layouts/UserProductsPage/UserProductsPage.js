import React, { useEffect, useState, useContext, useRef} from "react";
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

  const usernameReference = useRef(() => {})
  usernameReference.current = user.username
  
  const [userPosts, setUserPosts] = useState([]);
  const [postDetail, setPostDetail] = useState({});
  const [open, setOpen] = useState(false);
  const [didChange, setDidChange] = useState(false);

  useEffect(() => {
    (async () => {
      const res = await getAllUserPostings(usernameReference.current);
      setDidChange(false);
      setUserPosts(res.postings);
      setDidChange(true);
    })();
    console.log('rendered')
  }, [userPosts.length]);
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
      await deleteOne(post.id);
      const res = await getAllUserPostings(user.username);
      setUserPosts(res);
      setOpen(false);
      toastr["success"](`Item successfully deleted`);
      return;

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
        {userPosts.length > 0 && userPosts?.map((post, idx) => (
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
