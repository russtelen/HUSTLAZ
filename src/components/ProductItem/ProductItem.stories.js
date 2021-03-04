import React from "react"
import ProductItem from "./ProductItem"
import { actions } from "@storybook/addon-actions"

// 2
// const fakePost = {
//   id: "post1",
//   imageUrl: "https://i.imgur.com/aVqLAG7.png",
//   description: "It's in the shed",
//   liked: false,
//   totalLikes: 200,
//   totalComments: 20,
//   user: {
//     id: "user1",
//     username: "AJ",
//   },
// }

// 3
export default {
  title: "ProductItem",
  component: ProductItem,
}

// 2
const events = actions({})

//
export const Default = () => <ProductItem></ProductItem>
