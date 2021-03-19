import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import dollar from "../../logo/dollar.png";

// Icons
import HomeOutlined from "@material-ui/icons/HomeOutlined";
import PermIdentityOutlinedIcon from "@material-ui/icons/PermIdentityOutlined";
import NotificationsNoneOutlinedIcon from "@material-ui/icons/NotificationsNoneOutlined";

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    marginBottom: 1,
    backgroundColor: "#FDDEFE",
  },
  logo: {
    width: 35,
    height: 35,
  },
});

const TopNav = ({ homeClicked, profileClicked, notificationClicked }) => {
  const classes = useStyles();
  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Paper className={classes.root}>
      <div className="row">
        <div className="col-2 d-flex justify-content-center align-items-center">
          <p className="text-center h3">
            Hu
            <span>
              <img src={dollar} className={classes.logo} alt="Hustlaz Logo" />
            </span>
            tlaz
          </p>
        </div>

        <div className="col-10">
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="primary"
            centered
          >
            <Tab
              icon={<HomeOutlined />}
              label="Home"
              onClick={() => homeClicked()}
            />
            <Tab
              icon={<PermIdentityOutlinedIcon />}
              label="Profile"
              onClick={() => profileClicked()}
            />
            <Tab
              icon={<NotificationsNoneOutlinedIcon />}
              label="Notifications"
              onClick={() => notificationClicked()}
            />
          </Tabs>
        </div>
      </div>
    </Paper>
  );
};

export default TopNav;
