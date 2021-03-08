import axios from "axios"

const url = "https://e725t6sisd.execute-api.us-west-1.amazonaws.com/prod"

// @todo GET the user from context

// GET all postings
export const getAll = async () => {
  try {
    const res = await axios.get(`${url}/postings`)
    return res.data
  } catch (error) {
    console.error(error)
  }
}
