import React, { useState, useEffect, useContext } from "react";
import ProductItem from "../../components/ProductItem/ProductItem";
import { PostsContext } from "../../context/PostsContext";
import { useParams } from "react-router-dom";
import axios from "axios";

const ProductsPage = () => {
  const { posts, setPosts } = useContext(PostsContext);
  const { category } = useParams();
  const cardCliked = () => {
    console.log("Open product detail");
  };

  const likeCliked = () => {
    console.log("product saved");
  };

  const contactClicked = () => {
    console.log("contact seller");
  };

  useEffect(() => {
    (async () => {
      if (category != undefined) {
        const res = await axios.get(
          `https://e725t6sisd.execute-api.us-west-1.amazonaws.com/prod/postings/category/${category}`
        );

        const data = await res.data;

        setPosts(data);
        return;
      }

      const res = await axios.get(
        "https://e725t6sisd.execute-api.us-west-1.amazonaws.com/prod/postings"
      );
      const allPosts = await res.data.body;
      setPosts(allPosts);
    })();
  }, [category]);

  return (
    <div className="container">
      <h1 className="text-center mt-5">{posts[0]?.category}</h1>
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
