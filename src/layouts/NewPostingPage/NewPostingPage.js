import React, { useContext, useState, useEffect } from "react";
import NewPosting from "../../components/NewPosting/NewPosting";
import { getAllRegions, getCitiesByRegion, postOne } from "../../network";
import { useHistory } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import toastr from "toastr";

const NewPostingPage = () => {
  const history = useHistory();
  const { user } = useContext(UserContext);

  const [regions, setRegions] = useState([]);
  const [cities, setCities] = useState("");

  // make post req
  const submit = async (data) => {
    try {
      await postOne(data, user);
      toastr["success"]("New posting added", "Success");
      history.push("/dashboard/mypostings");
      return;

    } catch (e) {
      toastr["error"](
        "Something went wrong, we couldnt' add your posting",
        "Error"
      );
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
