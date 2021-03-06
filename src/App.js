import React, { useState, useEffect, useMemo } from "react";
import PageHeader from "./layouts/PageHeader/PageHeader";
import DashBoardPage from "./layouts/DashBoardPage/DashBoardPage";
import { PostsContext } from "./context/PostsContext";
import { fakePosts } from "./fakeDb";

function App() {
  const [posts, setPosts] = useState([]);
  const value = useMemo(() => ({ posts, setPosts }), [posts, setPosts]);

  useEffect(() => {
    setPosts(fakePosts);
  }, []);

  return (
    <>
      <PostsContext.Provider value={value}>
        <PageHeader />
        <DashBoardPage />
      </PostsContext.Provider>
    </>
  );
}

export default App;
