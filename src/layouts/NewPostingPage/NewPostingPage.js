import React, { useContext, useState, useEffect } from "react";
import NewPosting from "../../components/NewPosting/NewPosting";
import { postOne } from "../../network";
import { useHistory } from "react-router-dom";
import { UserContext } from "../../context/UserContext";

import axios from "axios";

const NewPostingPage = () => {
  const history = useHistory();
  const { user, setUser } = useContext(UserContext);

  const [regions, setRegions] = useState([]);
  const [cities, setCities] = useState("");

  // make post req
  const submit = async (data) => {
    await postOne(data, user);
    console.log(data);
    history.push("/posts");
  };

  const getRegions = async () => {
    try {
      const response = await axios.get(
        `https://e725t6sisd.execute-api.us-west-1.amazonaws.com/prod/regions`
      );
      setRegions(response.data.body);
    } catch (err) {
      console.log(err);
    }
  };

  const getCities = async (data) => {
    try {
      if (data) {
        const response = await axios.get(
          `https://e725t6sisd.execute-api.us-west-1.amazonaws.com/prod/cities/${data}`
        );
        setCities(response.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    (async () => {
      getRegions();
    })();
  }, []);

  return (
    <NewPosting
      submit={submit}
      regions={regions}
      getCities={getCities}
      cities={cities}
    />
  );
};

export default NewPostingPage;
