import React from "react"
import ProductItem from "./ProductItem"
import { actions } from "@storybook/addon-actions"

// 2
const fakePost = {
  PostingId: "1",
  UserId: "1",
  title: "Tesla Roadster",
  price: 200000,
  imageUrl: "https://cdn.motor1.com/images/mgl/Yp07j/s1/tesla-pricing-lead.jpg",
  desc:
    "Elon Musk's new baby. Lorem ipsum dolor sit amet consectetur adipisicing elit.",
  datePosted: Date.now(),
  city: "Vancouver, BC",
}

// 3
export default {
  title: "ProductItem",
  component: ProductItem,
}

// 2
const events = actions({
  cardClicked: "card clicked",
  likeClicked: "like clicked",
  contactClicked: "contact clicked",
})

//
export const Default = () => (
  <ProductItem post={{ ...fakePost, liked: true }} {...events}></ProductItem>
)
