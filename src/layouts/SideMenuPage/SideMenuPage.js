import React, { useContext } from "react";
import SideMenu from "../../components/SideMenu/SideMenu";
import SideMenuUser from "../../components/SideMenuUser/SideMenuUser";
import { TopNavValueContext } from "../../context/TopNavValueContext";
import { UserContext } from "../../context/UserContext";
import { useHistory } from "react-router-dom";
import toastr from "toastr";
import { LoginFormContext } from "../../context/LoginFormContext";
import { signOut } from '../../userAuth';

const SideMenuPage = () => {
  const history = useHistory();
  const { user, setUser } = useContext(UserContext);
  const { setTabValue } = useContext(LoginFormContext);
  const { topnavValue } = useContext(TopNavValueContext);

  const topPicksClicked = async () => {
    history.push("/posts");
  };

  // SideMenu Props
  const topsCatClicked = async () => {
    history.push("/posts/1");
  };

  const bottomsCatClicked = async () => {
    history.push("/posts/2");
  };

  const shoesCatClicked = async () => {
    history.push("/posts/3");
  };

  const miscCatClicked = () => {
    history.push("/posts/5");
  };

  const itemsCatClicked = async () => {
    history.push("/posts/4");
  };

  const sellSomethingClicked = () => {
    if (!user?.username) {
      toastr["error"]("You need to be logged in to do that", "Login");
    }

    history.push("/newPost");
  };

  const loginClicked = () => {
    setTabValue(0);
    history.push("/login");
  };

  const registerClicked = () => {
    setTabValue(1);
    history.push("/register");
  };

  const logoutClicked = async () => {
    signOut();
    setUser(null);
    // Success notification
    toastr["success"]("Successfully logged out");
    history.push("/");
  };

  // SideMenuUser Props
  const favouritesClicked = () => {
    history.push("/dashboard/favourites");
  };
  const profileClicked = () => {
    history.push("/dashboard/profile");
  };
  const myPostingsClicked = () => {
    history.push("/dashboard/mypostings");
  };
  return (
    <>
      {topnavValue === "profile" && user?.username ? (
        <SideMenuUser
          favouritesClicked={() => favouritesClicked()}
          profileClicked={() => profileClicked()}
          myPostingsClicked={() => myPostingsClicked()}
          sellSomethingClicked={() => sellSomethingClicked()}
          logoutClicked={() => logoutClicked()}
        />
      ) : (
        <SideMenu
          topPicksClicked={() => topPicksClicked()}
          topsCatClicked={() => topsCatClicked()}
          bottomsCatClicked={() => bottomsCatClicked()}
          shoesCatClicked={() => shoesCatClicked()}
          itemsCatClicked={() => itemsCatClicked()}
          miscCatClicked={() => miscCatClicked()}
          sellSomethingClicked={() => sellSomethingClicked()}
          loginClicked={() => loginClicked()}
          registerClicked={() => registerClicked()}
          logoutClicked={() => logoutClicked()}
        />
      )}
    </>
  );
};

export default SideMenuPage;
