import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import CssBaseline from "@material-ui/core/CssBaseline"
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import ListItemIcon from "@material-ui/core/ListItemIcon"
import ListItemText from "@material-ui/core/ListItemText"
import { Divider } from "@material-ui/core"

// Icon Imports
import ControlPointOutlinedIcon from "@material-ui/icons/ControlPointOutlined"
import ExitToAppOutlinedIcon from "@material-ui/icons/ExitToAppOutlined"
import { AccountCircle, FavoriteOutlined } from "@material-ui/icons"
import PostAddIcon from "@material-ui/icons/PostAdd"

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 250,
    height: "100vh",
    backgroundColor: theme.palette.background.paper,
    // display: "flex",
    // flexDirection: "column",
    // justifyContent: "space-between",
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
}))

const SideMenuUser = ({
  favouritesClicked,
  profileClicked,
  myPostingsClicked,
  sellSomethingClicked,
  logoutClicked,
}) => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <CssBaseline />
      <div>
        <List>
          <ListItem button onClick={() => profileClicked()}>
            <ListItemIcon>
              <AccountCircle />
            </ListItemIcon>
            <ListItemText primary="Profile" />
          </ListItem>
          <ListItem button onClick={() => favouritesClicked()}>
            <ListItemIcon>
              <FavoriteOutlined />
            </ListItemIcon>
            <ListItemText primary="Favourites" />
          </ListItem>
          <ListItem button onClick={() => myPostingsClicked()}>
            <ListItemIcon>
              <PostAddIcon />
            </ListItemIcon>
            <ListItemText primary="My Postings" />
          </ListItem>
          <ListItem button onClick={() => sellSomethingClicked()}>
            <ListItemIcon>
              <ControlPointOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary="Sell Something" />
          </ListItem>
        </List>
        <Divider />
      </div>
      <div>
        <List>
          <ListItem button onClick={() => logoutClicked()}>
            <ListItemIcon>
              <ExitToAppOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary="Log Out" />
          </ListItem>
        </List>
      </div>
    </div>
  )
}

export default SideMenuUser
