import React, { useState, useContext } from "react";
import { UserContext } from "../../context/UserContext";

const UserDetailPage = () => {
  const { user } = useContext(UserContext);

  console.log(user);
  return <div></div>;
};

export default UserDetailPage;
