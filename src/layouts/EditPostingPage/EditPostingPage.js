import React, { useContext, useState, useEffect } from "react";
import NewPosting from "../../components/NewPosting/NewPosting";
import { getAllRegions, getCitiesByRegion, postOne } from "../../network";
import { useHistory } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import { EditPostContext } from "../../context/EditPostContext";

const EditPostingPage = () => {
  const history = useHistory();

  const { user, setUser } = useContext(UserContext);
  const { editPost, setEditPost } = useContext(EditPostContext);

  const [regions, setRegions] = useState([]);
  const [cities, setCities] = useState("");

  const submit = async (data) => {
    await postOne(data, user);
    history.push("/posts");
  };

  const getRegions = async () => {
    try {
      const regions = await getAllRegions();
      setRegions(regions);
    } catch (err) {
      console.log(err);
    }
  };

  const getCities = async (region) => {
    try {
      if (region) {
        const cities = await getCitiesByRegion(region);
        setCities(cities);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    (async () => {
      await getRegions();
    })();
  }, []);

  return (
    <NewPosting
      submit={submit}
      regions={regions}
      getCities={getCities}
      cities={cities}
      post={editPost}
    />
  );
};

export default EditPostingPage;
