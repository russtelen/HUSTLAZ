import React from "react"
import NewPosting from "../../components/NewPosting/NewPosting"
import { postOne } from "../../network"
import { useHistory } from "react-router-dom"

const NewPostingPage = () => {
  const history = useHistory()

  // make post req
  const submit = async (data) => {
    await postOne(data)
    console.log(data)
    history.push("/posts")
  }

  return <NewPosting submit={submit} />
}

export default NewPostingPage
