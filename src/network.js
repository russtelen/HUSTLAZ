import axios from "axios";

// api url
const url = "https://e725t6sisd.execute-api.us-west-1.amazonaws.com/prod";

// @todo GET the user from context

// GET all postings
export const getAll = async () => {
  try {
    const res = await axios.get(`${url}/postings`);
    console.log(res.data.body);
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

// POST One
export const postOne = async ({
  title,
  price,
  image_ref,
  category,
  city,
  province,
  seller_description,
}) => {
  // const authHeader = { Authorization: `Bearer ${token}` }

  // hard coded user - replace it with the user that comes from context api
  const user = {
    userId: "123612836876",
    username: "johndoe69",
    email: "johndoe@gmail.com",
  };
  try {
    const res = await axios.post(`${url}/postings`, {
      user,
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
