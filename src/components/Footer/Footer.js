import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    height: 200,
    backgroundColor: "#FDDEFE",
    marginTop: 50,
  },
  a: {
    color: "inherit",
  },
}));
const Footer = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "100%" }}
      >
        <div className="row" style={{ width: "80%" }}>
          <div className="col-12 col-md-6 p-0 d-flex justify-content-center ">
            <div>
              <p>
                <strong>
                  <u>BCIT Hustlaz 2021 &copy;</u>
                </strong>
              </p>
              <p className="text-muted">Eductional Purposes Only</p>
            </div>
          </div>
          <div className="col-12 col-md-6 p-0 d-flex justify-content-center ">
            <div>
              <p>
                <strong>
                  <u>Designed and Engineered by:</u>
                </strong>
              </p>
              <ul className="list-unstyled">
                <li className="my-2 text-muted text-center">
                  <a
                    className={classes.a}
                    href="https://github.com/nickchvt"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Nick Charvat
                  </a>
                </li>
                <li className="my-2 text-muted text-center">
                  <a
                    className={classes.a}
                    href="https://github.com/gokay-abay"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Gokay Abay
                  </a>
                </li>
                <li className="my-2 text-muted text-center">
                  <a
                    className={classes.a}
                    href="https://github.com/russtelen"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Russell Telen
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
