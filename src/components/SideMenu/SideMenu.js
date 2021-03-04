import React from "react";

const SideMenu = ({ user }) => {
  return (
    <div>
      <h1>SideMenu</h1>
      {user ? <p>log out</p> : <p>login, register</p>}
    </div>
  );
};

export default SideMenu;
