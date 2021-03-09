import React, { useContext } from "react";
import NewPosting from "../../components/NewPosting/NewPosting";
import { postOne } from "../../network";
import { useHistory } from "react-router-dom";
import { UserContext } from "../../context/UserContext";

const NewPostingPage = () => {
  const history = useHistory();
  const { user, setUser } = useContext(UserContext);
  // make post req
  const submit = async (data) => {
    await postOne(data, user);
    console.log(data);
    history.push("/posts");
  };

  return <NewPosting submit={submit} />;
};

export default NewPostingPage;
