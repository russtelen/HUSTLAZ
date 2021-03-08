import React, { useState, useEffect, useContext } from "react"
import ProductItem from "../../components/ProductItem/ProductItem"
import { getAll } from "../../network"

const ProductsPage = () => {
  const posts = JSON.parse(window.localStorage.getItem("posts"))

  const [products, setProducts] = useState([])

  useEffect(() => {
    ;(async () => {
      const products = await getAll()
      setProducts(products)
    })()
  }, [])

  const cardCliked = () => {
    console.log("Open product detail")
  }

  const likeCliked = () => {
    console.log("product saved")
  }

  const contactClicked = () => {
    console.log("contact seller")
  }

  return (
    <div className="container">
      <h1 className="text-center mt-5">{posts[0].category}</h1>
      <div className="row d-flex justify-content-center">
        {products?.map((post) => (
          <div className="col-4 mt-5">
            <ProductItem
              post={post}
              cardClicked={() => cardCliked()}
              likeClicked={() => likeCliked()}
              contactClicked={() => contactClicked()}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default ProductsPage
