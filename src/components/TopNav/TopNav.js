import React, { useState, useEffect } from "react"
import { makeStyles } from "@material-ui/core/styles"
import Paper from "@material-ui/core/Paper"
import Tabs from "@material-ui/core/Tabs"
import Tab from "@material-ui/core/Tab"

// Icons
import HomeOutlined from "@material-ui/icons/HomeOutlined"
import PermIdentityOutlinedIcon from "@material-ui/icons/PermIdentityOutlined"
import NotificationsNoneOutlinedIcon from "@material-ui/icons/NotificationsNoneOutlined"

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
})

const TopNav = ({ homeClicked, profileClicked, notificationClicked }) => {
  const classes = useStyles()
  const [value, setValue] = useState(0)

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }
  return (
    <Paper className={classes.root}>
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
    </Paper>
  )
}

export default TopNav
