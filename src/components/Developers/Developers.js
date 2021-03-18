import React from "react"
import { AiFillGithub, AiFillLinkedin } from "react-icons/ai"
import { SiWebmoney } from "react-icons/si"
const Developers = ({ developer }) => {
  console.log(developer ? developer.image : "")
  return (
    <div className="container">
      {!developer ? (
        <p>Loading...</p>
      ) : (
        <div>
          <h1 className="text-center mt-5">{developer.name}</h1>
          <div className="my-5">
            <div className="row">
              <div className="col-sm-12 col-md-6 mb-4">
                <img src={developer.image} style={{ maxWidth: "100%" }} />
              </div>
              <div className="col-sm-12 col-md-6">
                <div className="row">
                  <div className="col-12">
                    <h3>About</h3>
                    <p className="mt-3" style={{ lineHeight: 2 }}>
                      {developer.about}
                    </p>
                  </div>
                  <div className="col-12">
                    <h3>Get Connected</h3>
                    <div className="mt-3">
                      <p>
                        <a
                          href={developer.github}
                          target="_blank"
                          style={{ color: "inherit" }}
                        >
                          Github <AiFillGithub size={30} />
                        </a>
                      </p>

                      <p>
                        <a
                          href={developer.linkedin}
                          target="_blank"
                          style={{ color: "inherit" }}
                        >
                          LinkedIn <AiFillLinkedin size={30} />
                        </a>
                      </p>

                      {developer.portfolio && (
                        <>
                          <p>
                            <a
                              href={developer.portfolio}
                              target="_blank"
                              style={{ color: "inherit" }}
                            >
                              Portfolio <SiWebmoney size={30} />{" "}
                            </a>
                          </p>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>{" "}
        </div>
      )}
    </div>
  )
}

export default Developers
