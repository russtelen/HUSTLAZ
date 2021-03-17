import React from "react"

const Developers = ({ developer }) => {
  return (
    <div className="container">
      {!developer ? (
        <p>Loading...</p>
      ) : (
        <>
          <h1 className="text-center mt-3">{developer.name}</h1>
          <div className="my-5">
            <div className="row">
              <div className="col-6">
                <img src={developer.img} />
              </div>
              <div className="col-6">
                <div className="row">
                  <div>
                    <h3>About</h3>
                    <p>{developer.about}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>{" "}
        </>
      )}
    </div>
  )
}

export default Developers
