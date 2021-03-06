import React from "react";
import NewPosting from "../../components/NewPosting/NewPosting";

const NewPostingPage = () => {
  const submit = (newPost) => {
    console.log(newPost);
    alert(`Successfully added ${newPost.title} for $${newPost.price}`);
  };

  return <NewPosting submit={submit} />;
};

export default NewPostingPage;
