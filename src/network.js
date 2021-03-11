import axios from "axios";

// api url
const url = "https://e725t6sisd.execute-api.us-west-1.amazonaws.com/prod";

// @todo GET the user from context

// GET all postings
export const getAll = async () => {
  try {
    const res = await axios.get(`${url}/postings`);
    return res.data.body;
  } catch (error) {
    console.error(error);
  }
};

// GET all postings by category
export const getPostingsByCategory = async (categoryId) => {
  try {
    const res = await axios.get(`${url}/postings/category/${categoryId}`);
    return res.data;
  } catch (error) {
    console.error(error);
  }
};

// GET One
export const getOne = async (postingId) => {
  try {
    const res = await axios.get(`${url}/postings/${postingId}`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

// POST One
export const postOne = async (
  { title, price, image_ref, category, city, province, seller_description },
  user
) => {
  // const authHeader = { Authorization: `Bearer ${token}` }

  // hard coded user - replace it with the user that comes from context api
  const userObj = {
    username: user.username,
  };

  try {
    const res = await axios.post(`${url}/postings`, {
      user: userObj,
      title,
      price,
      image_ref,
      category,
      city,
      province,
      seller_description,
    });
    console.log(res);
  } catch (error) {
    console.error(error);
  }
};

//  GET all regions
export const getAllRegions = async () => {
  try {
    const res = await axios.get(`${url}/regions`);
    return res.data.body;
  } catch (err) {
    console.log(err);
  }
};

//  GET all cities by region
export const getCitiesByRegion = async (region) => {
  try {
    const res = await axios.get(`${url}/cities/${region}`);
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

// GET all post that belong to current user
export const getAllUserPostings = async (username) => {
  try {
    const res = await axios.get(`${url}/users/${username}`);
    return res.data.postings;
  } catch (error) {
    console.log(error);
  }
};

// UPDATE ONE POST
export const updateOne = async (
  { title, price, image_ref, category, city, province, seller_description },
  postingId
) => {
  console.log(postingId);
  try {
    const res = await axios.put(`${url}/postings/${postingId}`, {
      title,
      price,
      image_ref,
      category,
      city,
      province,
      seller_description,
    });
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
