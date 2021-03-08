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
    const res = await axios.get(
      "https://e725t6sisd.execute-api.us-west-1.amazonaws.com/prod/postings"
    );
    const allPosts = await res.data.body;
    setPosts(allPosts);
    // console.log("home!");
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
