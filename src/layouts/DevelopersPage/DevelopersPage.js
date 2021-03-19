import React, { useEffect, useState, useRef } from "react"
import Developers from "../../components/Developers/Developers"
import { useParams } from "react-router-dom"

const DevelopersPage = () => {
  const { name } = useParams()
  const [developer, setDeveloper] = useState()
  const [newDeveloper, setNewDeveloper] = useState(false)

  const developers = [
    {
      name: "Nick",
      image: "../../../assets/nick.jpg",
      about:
        "After having worked many years in the restaurant industry, then shifting over to the package handling industry, I was ready for a change. That change began at BCIT back in 2019. After some extensive research, I decided that programming is something that I wanted to pursue as a career. I quickly developed a passion for it after just a couple of evening courses, and continued to study part-time while I worked full-time at Fed Ex. After a year of studying part-time, I wanted to take my studies to the next level and enroll myself in a full-time program. I decided that the Software Systems Developer program was the best fit for me, and would be exactly what I needed to kickstart my career as a professional web developer. I'm now looking forward to the road ahead, and whatever opportunities may come my way. ",
      github: "https://github.com/nickchvt",
      linkedin: "https://www.linkedin.com/in/nicholas-charvat-1814771b7/",
      portfolio: "https://nickchvt.netlify.app/",
    },
    {
      name: "Gokay",
      image: "../../../assets/gokay.jpg",
      about:
        "I am Gökay, a full-stack web developer based in Vancouver. Science and computers have always fascinated me. I went on to obtain a degree in geology but part of me always wanted to learn more about the language of computers. Thus, here I am, currently studying software development at BCIT. The beauty of programming to me is that creating something unique on the web is the closest one can get to real life magic. I started my journey to becoming a software developer on June 18th, 2018. Since then, I have been teaching myself web and mobile application development and creating apps that use various technologies in my spare time. As productive as my self-directed learning was, I decided to seek formal education near the end of 2019 After extensive research, I enrolled in the Software System Developer program at BCIT. Having a strong interest and experience in both frontend and backend languages, I am excited to further my career as a full-stack web and mobile application developer.",
      github: "https://github.com/gokay-abay",
      linkedin: "https://www.linkedin.com/in/gokay-abay/",
      portfolio: "https://www.gokayabay.com",
    },
    {
      name: "Russ",
      image: "../../../assets/russ.jpg",
      about:
        "I am a full stack web developer based in Vancouver, BC with a background in Finance. Over the years of working in the Finance industry, I was exposed to a lot of repetitive reporting. I thought to myself, there's got to be a better way. There's got to be a way to automate this. That curiosity opened a door which revealed the world of programming. I eventually found a passion for technology which led me to enroll at British Columbia Institute of Technology's Software System's Developer Program (SSD). SSD is a hands on program that gave me solid knowledge in database management, front end and back end frameworks such as React, Angular, NodeJS, Express and ASP.NET. When I'm not figuring out how to fix a bug or finding answers in Stack Overflow, you will find me capturing the streets and people of Vancouver through the eyes of a film camera. Check out my work here.",
      github: "https://github.com/russtelen",
      linkedin: "https://github.com/russtelen",
      portfolio: "https://russtelen.me/",
    },
  ]

  const findDeveloperReference = useRef(() => {})

   findDeveloperReference.current = async () => {
    const res = developers.find((d) => d.name === name)
    return res
  }

  useEffect(() => {
    ;(async () => {
      const res = await findDeveloperReference.current()
      setNewDeveloper(false)
      setDeveloper(res)
      setTimeout(() => {
        setNewDeveloper(true)
      }, 50)
    })()
  }, [name])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [developer])

  return (
    <div
      className={
        newDeveloper
          ? "animate__animated animate__fadeInUp container"
          : "container"
      }
    >
      <Developers developer={developer} />
    </div>
  )
}

export default DevelopersPage
