import React, { useContext, useState, useEffect } from "react";
import NewPosting from "../../components/NewPosting/NewPosting";
import { getAllRegions, getCitiesByRegion, updateOne, updateOneImageFile } from "../../network";
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
    try {
      switch (data.type) {
        case 'url':
          await updateOne(data, postingId)
          toastr["success"](`Item successfully updated`);
          break;
        case 'file':
          await updateOneImageFile(data, postingId)
          toastr["success"](`Item successfully updated`);
          break;
        default:
          throw Error("Unexpected Error")
      }
      history.push("/dashboard/mypostings");
    } catch (e) {
      toastr["error"](`${e.message}`);
      console.log(e);
    }
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
