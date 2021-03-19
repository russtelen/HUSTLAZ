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

async function http({ method, path, data, params }) {
  const token = await tokenHeader()
  const headers = {
    ...token,
    Accept: 'application/json',
    'Content-Type': 'application/json',
  }

  try {
    let result
    if (method === 'get' || method === 'delete') {
      result = await axios[method](url + path, { headers })
    } else {
      result = await axios[method](url + path, params, { headers })
    }
    return result.data
  } catch (error) {
    // throw error.response.data.error ? Error(error.response.data.error) : error
    console.error(error)
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

export async function postOneImageFile(
  { title, price, file, category, city, province, seller_description },
  user
) {
  let signedURLResult = await http({ method: 'get', path: '/securetoken' })
  const { uploadURL } = signedURLResult

  await axios.put(uploadURL, file)
  const image_ref = uploadURL.split('?')[0]

  return await postOne(
    { title, price, image_ref, category, city, province, seller_description },
    user
  )
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
  return http({ method: 'get', path: `/users/postings/${username}` })
}

export function getUser(username) {
  return http({ method: 'get', path: `/users/${username}` })
}

export function getUserAddress(username) {
  return http({ method: 'get', path: `/users/address/${username}` })
}

export async function updateUserDetailsFileUpload(
  { firstName, lastName, phoneNumber, file },
  username
) {
  let signedURLResult = await http({ method: 'get', path: '/securetoken' })
  const { uploadURL } = signedURLResult

  await axios.put(uploadURL, file)
  const profilePicture = uploadURL.split('?')[0]

  return await updateUserDetails(
    { firstName, lastName, phoneNumber, profilePicture },
    username
  )
}

export function updateUserAddress(
  { address, city, province, postalCode },
  username
) {
  console.log('network:', address, city, province, postalCode)
  return http({
    method: 'put',
    path: `/users/address/${username}`,
    params: {
      address,
      city,
      province,
      postalCode,
    },
  })
}

export function updateUserDetails(
  { firstName, lastName, phoneNumber, profilePicture },
  username
) {
  return http({
    method: 'put',
    path: `/users/${username}`,
    params: {
      firstName,
      lastName,
      phoneNumber,
      profilePicture,
    },
  })
}

// export async function getUserAddress(username) {
//   try {
//     const res = await axios.get(`${url}/users/address/${username}`)
//     return res.data
//   } catch (err) {
//     console.log(err)
//   }
// }

export async function updateOneImageFile(
  { title, price, file, category, city, province, seller_description },
  postingId
) {
  let signedURLResult = await http({ method: 'get', path: '/securetoken' })
  const { uploadURL } = signedURLResult

  await axios.put(uploadURL, file)
  const image_ref = uploadURL.split('?')[0]

  return await updateOne(
    { title, price, image_ref, category, city, province, seller_description },
    postingId
  )
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

// GET FAVOURITES
export function getAllUserFavourites(username) {
  return http({ method: 'get', path: `/users/favourites/${username}` })
}

// POST FAVOURITES
export function addUserFavourite(username, postingId) {
  return http({
    method: 'post',
    path: `/users/favourites`,
    params: { username, postingId },
  })
}

// DELETE FAVOURITES
export async function removeUserFavourite(postingId) {
  const token = await userToken()

  try {
    const res = await axios.delete(`${url}/users/favourites`, {
      data: { postingId },
      headers: { Authorization: `${token}` },
    })
    return res.data
  } catch (err) {
    console.log(err)
  }
}

// GET search postings by title or author
export async function searchPostings(searchValue) {
  const params = new URLSearchParams([['searchValue', searchValue]])
  try {
    const res = await axios.get(`${url}/postings/search`, { params })
    return res.data.body
  } catch (err) {
    console.log(err)
  }
}
