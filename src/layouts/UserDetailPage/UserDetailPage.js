import React, { useState, useContext, useEffect } from "react";
import UserDetail from "../../components/UserDetail/UserDetail";
import { UserContext } from "../../context/UserContext";
import { getAllUserPostings } from "../../network";

const UserDetailPage = () => {
  const { user } = useContext(UserContext);
  const [userDetail, setUserDetail] = useState({});

  useEffect(() => {
    (async () => {
      const res = await getAllUserPostings(user.username);
      setUserDetail(res);
    })();
  }, [user]);

  const editClicked = () => {
    // PLACEHOLDER: Allow user to edit their info
  };

  return (
    <div className="container">
      <h1 className="text-center m-5">My Profile</h1>
      <UserDetail user={userDetail} editClicked={() => editClicked()} />
    </div>
  );
};

export default UserDetailPage;
