import axios from 'axios'
import { userToken } from './userAuth'

const url = 'https://e725t6sisd.execute-api.us-west-1.amazonaws.com/prod'

async function tokenHeader() {
  const token = await userToken()
  if (!token) {
    return {}
  }
  return { Authorization: `${token}` }
}

async function http({ method, path, params }) {
  const token = await tokenHeader()
  const headers = {
    ...token,
    Accept: 'application/json',
    'Content-Type': 'application/json',
  }

  try {
    let result
    if (method == 'get') {
      result = await axios[method](url + path, { headers })
    } else {
      result = await axios[method](url + path, params, { headers })
    }

    return result.data
  } catch (error) {
    throw error.response.data.error ? Error(error.response.data.error) : error
  }
}

// GET all postings
export const getAll = async () => {
  try {
    const res = await axios.get(`${url}/postings`)
    return res.data.body
  } catch (error) {
    console.error(error)
  }
}

// GET all postings by category
export const getPostingsByCategory = async (categoryId) => {
  try {
    const res = await axios.get(`${url}/postings/category/${categoryId}`)
    return res.data
  } catch (error) {
    console.error(error)
  }
}

// GET One
export const getOne = async (postingId) => {
  try {
    const res = await axios.get(`${url}/postings/${postingId}`)
    return res.data
  } catch (error) {
    console.log(error)
  }
}

// POST One
export function postOne(
  { title, price, image_ref, category, city, province, seller_description },
  user
) {
  const userObj = {
    username: user.username,
  }

  return http({
    method: 'post',
    path: '/postings',
    params: {
      user: userObj,
      title,
      price,
      image_ref,
      category,
      city,
      province,
      seller_description,
    },
  })
}

//  GET all regions
export const getAllRegions = async () => {
  try {
    const res = await axios.get(`${url}/regions`)
    return res.data.body
  } catch (err) {
    console.log(err)
  }
}

//  GET all cities by region
export const getCitiesByRegion = async (region) => {
  try {
    const res = await axios.get(`${url}/cities/${region}`)
    return res.data
  } catch (err) {
    console.log(err)
  }
}

// GET all post that belong to current user
export function getAllUserPostings(username) {
  return http({ method: 'get', path: `/users/${username}` })
}

// UPDATE posting
export function updateOne(
  { title, price, image_ref, category, city, province, seller_description },
  postingId
) {
  return http({
    method: 'put',
    path: `/postings/${postingId}`,
    params: {
      title,
      price,
      image_ref,
      category,
      city,
      province,
      seller_description,
    },
  })
}

// DELETE posting
export function deleteOne(postingId) {
  return http({ method: 'delete', path: `/postings/${postingId}` })
}
