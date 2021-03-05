import React from "react";
import ProductItem from "../../components/ProductItem/ProductItem";
import { fakePosts } from "../../fakeDb";

const ProductsPage = () => {
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
        {fakePosts.map((fakePost) => (
          <div className="col-4 mt-5">
            <ProductItem
              post={{ ...fakePost }}
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
