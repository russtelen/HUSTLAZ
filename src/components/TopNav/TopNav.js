import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import HomeOutlined from "@material-ui/icons/HomeOutlined";
import PermIdentityOutlinedIcon from "@material-ui/icons/PermIdentityOutlined";
import NotificationsNoneOutlinedIcon from "@material-ui/icons/NotificationsNoneOutlined";

const useStyles = makeStyles({
  root: {
    width: 500,
  },
});

const TopNav = ({ homeClicked, profileClicked, notificationClicked }) => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  return (
    <BottomNavigation
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
      showLabels
      className={classes.root}
    >
      <BottomNavigationAction
        label="Home"
        icon={<HomeOutlined />}
        onClick={() => homeClicked()}
      />
      <BottomNavigationAction
        label="Profile"
        icon={<PermIdentityOutlinedIcon />}
        onClick={() => profileClicked()}
      />
      <BottomNavigationAction
        label="Notifications"
        onClick={() => notificationClicked()}
        icon={<NotificationsNoneOutlinedIcon />}
      />
    </BottomNavigation>
  );
};

export default TopNav;
