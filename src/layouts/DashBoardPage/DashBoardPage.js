import React from "react";
import ProductsPage from "../ProductsPage/ProductsPage";
import SideMenuPage from "../SideMenuPage/SideMenuPage";

const DashBoardPage = () => {
  return (
    <div style={{ display: "flex" }}>
      <SideMenuPage />
      <ProductsPage />
    </div>
  );
};

export default DashBoardPage;
