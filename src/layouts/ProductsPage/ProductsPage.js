import React, { useState, useEffect, useContext } from "react";
import ProductItem from "../../components/ProductItem/ProductItem";
import { PostsContext } from "../../context/PostsContext";

const ProductsPage = () => {
  const { posts, setPosts } = useContext(PostsContext);

  const cardCliked = () => {
    console.log("Open product detail");
  };

  const likeCliked = () => {
    console.log("product saved");
  };

  const contactClicked = () => {
    console.log("contact seller");
  };

  return (
    <div className="container">
      <div className="row d-flex justify-content-center">
        {posts.map((post) => (
          <div className="col-4 mt-5">
            <ProductItem
              post={{ ...post }}
              cardClicked={() => cardCliked()}
              likeClicked={() => likeCliked()}
              contactClicked={() => contactClicked()}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductsPage;
