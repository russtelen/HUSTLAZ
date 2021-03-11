import React, { useContext, useState, useEffect } from "react";
import NewPosting from "../../components/NewPosting/NewPosting";
import { getAllRegions, getCitiesByRegion, updateOne } from "../../network";
import { useHistory, useParams } from "react-router-dom";
import { EditPostContext } from "../../context/EditPostContext";
import toastr from "toastr";

const EditPostingPage = () => {
  const history = useHistory();
  const { postingId } = useParams();

  const { editPost } = useContext(EditPostContext);
  const [regions, setRegions] = useState([]);
  const [cities, setCities] = useState("");

  const submit = async (data) => {
    await updateOne(data, postingId);
    history.push("/dashboard/mypostings");
    toastr["success"](`Item successfully updated`);
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
