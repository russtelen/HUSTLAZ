import React from "react"
import { AiFillGithub, AiFillLinkedin } from "react-icons/ai"
import { SiWebmoney } from "react-icons/si"
import { Typography } from "@material-ui/core";

const Developers = ({ developer }) => {
  return (
    <div className="container">
      {!developer ? (
        <Typography>Loading...</Typography>
      ) : (
        <div>
          <h1 className="text-center mt-5">{developer.name}</h1>
          <div className="my-5">
            <div className="row">
              <div className="col-sm-12 col-md-6 mb-4">
                <img
                  src={developer.image}
                  style={{
                    maxWidth: "100%",
                    boxShadow: "17px 25px 52px -17px rgba(0,0,0,0.75)",
                  }}
                  alt={developer.name}
                />
              </div>
              <div className="col-sm-12 col-md-6">
                <div className="row">
                  <div className="col-12">
                    <h3 className="text-right">About</h3>
                    <Typography className="mt-3 text-right" style={{ lineHeight: 2 }}>
                      {developer.about}
                    </Typography>
                  </div>
                  <div className="col-12">
                    <h3 className="text-right">Get Connected</h3>
                    <div className="mt-3">
                      <Typography className="text-right">
                        <a
                          href={developer.github}
                          target="_blank"
                          rel="noreferrer"
                          style={{ color: "inherit" }}
                        >
                          Github <AiFillGithub size={30} />
                        </a>
                      </Typography>

                      <Typography className="text-right">
                        <a
                          href={developer.linkedin}
                          target="_blank"
                          rel="noreferrer"
                          style={{ color: "inherit" }}
                        >
                          LinkedIn <AiFillLinkedin size={30} />
                        </a>
                      </Typography>

                      {developer.portfolio && (
                        <>
                          <Typography className="text-right">
                            <a
                              href={developer.portfolio}
                              target="_blank"
                              rel="noreferrer"
                              style={{ color: "inherit" }}
                            >
                              Portfolio <SiWebmoney size={30} />{" "}
                            </a>
                          </Typography>
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
