import React from "react"
import ProductDetail from "./ProductDetail"
import { actions } from "@storybook/addon-actions"

export default {
  title: "ProductDetail",
  component: ProductDetail,
}

const events = actions({ onSubmit: "submit" })

export const Default = () => <ProductDetail {...events}></ProductDetail>
