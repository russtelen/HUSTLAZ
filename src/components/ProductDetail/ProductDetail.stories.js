import React from "react"
import ProductDetail from "./ProductDetail"
import { actions } from "@storybook/addon-actions"

const fakePost = {
  PostingId: "1",
  username: "John Doe",
  title: "Tesla Roadster",
  price: 200000,
  images: [
    "https://cdn.motor1.com/images/mgl/Yp07j/s1/tesla-pricing-lead.jpg",
    "https://cdn.motor1.com/images/mgl/Yp07j/s1/tesla-pricing-lead.jpg",
    "https://cdn.motor1.com/images/mgl/Yp07j/s1/tesla-pricing-lead.jpg",
    "https://cdn.motor1.com/images/mgl/Yp07j/s1/tesla-pricing-lead.jpg",
  ],
  desc:
    "Elon Musk's new baby. Lorem ipsum dolor sit amet consectetur adipisicing elit.",
  datePosted: Date.now(),
  city: "Vancouver, BC",
  contact: "778-123-4567",
}

export default {
  title: "ProductDetail",
  component: ProductDetail,
}

const events = actions({
  closeClicked: "closeClicked",
  editClicked: "editClicked",
  deleteClicked: "deleteClicked",
  imageClicked: "imageClicked",
})

export const Default = () => (
  <ProductDetail post={{ ...fakePost }} {...events}></ProductDetail>
)
