import React from "react"
import ProductItem from "./ProductItem"
import { actions } from "@storybook/addon-actions"

// 2
const fakePost = {
  PostingId: "1",
  UserId: "1",
  Title: "Tesla Roadster",
  imageUrl: "https://cdn.motor1.com/images/mgl/Yp07j/s1/tesla-pricing-lead.jpg",
  SellerDescription:
    "Elon Musk's new baby. Lorem ipsum dolor sit amet consectetur adipisicing elit.",
  DatePosted: Date.now(),
  location: "",
}

// 3
export default {
  title: "ProductItem",
  component: ProductItem,
}

// 2
const events = actions({})

//
export const Default = () => <ProductItem></ProductItem>
