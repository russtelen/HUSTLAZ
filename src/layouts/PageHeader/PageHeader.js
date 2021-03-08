import React, { useContext } from "react";
import TopNav from "../../components/TopNav/TopNav";
import { PostsContext } from "../../context/PostsContext";
import { useHistory } from "react-router-dom";
import axios from "axios";

const PageHeader = () => {
  const history = useHistory();

  const { posts, setPosts } = useContext(PostsContext);

  const homeClicked = async () => {
    history.push("/posts");
  };

  const profileClicked = () => {
    console.log("profile!");
  };

  const notificationClicked = () => {
    console.log("notifications!");
  };
  return (
    <TopNav
      homeClicked={() => homeClicked()}
      profileClicked={() => profileClicked()}
      notificationClicked={() => notificationClicked()}
    />
  );
};

export default PageHeader;
