import React, { useEffect, useContext } from "react";
import ProductItem from "../../components/ProductItem/ProductItem";
import { PostsContext } from "../../context/PostsContext";
import { useParams } from "react-router-dom";
import { getAll, getPostingsByCategory } from "../../network";
import axios from "axios";

const ProductsPage = () => {
  // Context
  const { posts, setPosts } = useContext(PostsContext);
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
      <h1 className="text-center mt-5">{posts[0]?.category}</h1>
      <div className="row d-flex justify-content-center">
        {posts?.map((post) => (
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
