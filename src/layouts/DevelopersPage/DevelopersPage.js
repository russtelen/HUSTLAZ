import React, { useEffect, useState } from "react"
import Developers from "../../components/Developers/Developers"
import { useParams } from "react-router-dom"

const DevelopersPage = () => {
  const { name } = useParams()

  const [developer, setDeveloper] = useState(null)

  const developers = [
    {
      name: "Nick",
      imageUrl: "",
      about: "Lorem Ipsum",
      github: "https://github.com/nickchvt",
      linkedin: "https://github.com/nickchvt",
    },
    {
      name: "Gokay",
      imageUrl: "",
      about: "Lorem Ipsum",
      github: "https://github.com/gokay-abay",
      linkedin: "https://github.com/gokay-abay",
    },
    {
      name: "Russ",
      imageUrl: "",
      about: "Lorem Ipsum",
      github: "https://github.com/russtelen",
      linkedin: "https://github.com/russtelen",
    },
  ]

  useEffect(() => {
    const developer = developers.find((d) => d.name == name)
    setDeveloper(developer)
  }, [name])
  return <Developers developer={developer} />
}

export default DevelopersPage
