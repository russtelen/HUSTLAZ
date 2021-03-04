import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import { Divider } from "@material-ui/core";

// Icon Imports
import StarBorderOutlinedIcon from "@material-ui/icons/StarBorderOutlined";
import ControlPointOutlinedIcon from "@material-ui/icons/ControlPointOutlined";
import SearchOutlinedIcon from "@material-ui/icons/SearchOutlined";
import CategoryIcon from "@material-ui/icons/Category";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import AcUnitIcon from "@material-ui/icons/AcUnit";
import AirplanemodeActiveIcon from "@material-ui/icons/AirplanemodeActive";
import AlbumIcon from "@material-ui/icons/Album";
import AttachFileIcon from "@material-ui/icons/AttachFile";
import BlurCircularIcon from "@material-ui/icons/BlurCircular";
import ExitToAppOutlinedIcon from "@material-ui/icons/ExitToAppOutlined";
import VpnKeyOutlinedIcon from "@material-ui/icons/VpnKeyOutlined";
import CreateOutlinedIcon from "@material-ui/icons/CreateOutlined";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 250,
    height: "100vh",
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));

const SideMenu = ({ user, events }) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <List>
        <ListItem button onClick={() => events.topPicksClicked()}>
          <ListItemIcon>
            <StarBorderOutlinedIcon />
          </ListItemIcon>
          <ListItemText primary="Top Picks" />
        </ListItem>
        <ListItem button onClick={handleClick}>
          <ListItemIcon>
            <CategoryIcon />
          </ListItemIcon>
          <ListItemText primary="Shop By Category" />
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem
              button
              className={classes.nested}
              onClick={() => events.cat1Clicked()}
            >
              <ListItemIcon>
                <AcUnitIcon />
              </ListItemIcon>
              <ListItemText primary="Category 1" />
            </ListItem>
            <ListItem
              button
              className={classes.nested}
              onClick={() => events.cat2Clicked()}
            >
              <ListItemIcon>
                <AirplanemodeActiveIcon />
              </ListItemIcon>
              <ListItemText primary="Category 2" />
            </ListItem>
            <ListItem
              button
              className={classes.nested}
              onClick={() => events.cat3Clicked()}
            >
              <ListItemIcon>
                <AlbumIcon />
              </ListItemIcon>
              <ListItemText primary="Category 3" />
            </ListItem>
            <ListItem
              button
              className={classes.nested}
              onClick={() => events.cat4Clicked()}
            >
              <ListItemIcon>
                <AttachFileIcon />
              </ListItemIcon>
              <ListItemText primary="Category 4" />
            </ListItem>
            <ListItem
              button
              className={classes.nested}
              onClick={() => events.cat5Clicked()}
            >
              <ListItemIcon>
                <BlurCircularIcon />
              </ListItemIcon>
              <ListItemText primary="Category 5" />
            </ListItem>
          </List>
        </Collapse>
        <ListItem button onClick={() => events.sellSomethingClicked()}>
          <ListItemIcon>
            <ControlPointOutlinedIcon />
          </ListItemIcon>
          <ListItemText primary="Sell Something" />
        </ListItem>
        <ListItem button onClick={() => events.searchClicked()}>
          <ListItemIcon>
            <SearchOutlinedIcon />
          </ListItemIcon>
          <ListItemText primary="Search" />
        </ListItem>
      </List>
      <Divider />
      <List>
        {user ? (
          <>
            <ListItem button onClick={() => events.logoutClicked()}>
              <ListItemIcon>
                <ExitToAppOutlinedIcon />
              </ListItemIcon>
              <ListItemText primary="Log Out" />
            </ListItem>
          </>
        ) : (
          <>
            <ListItem button onClick={() => events.loginClicked()}>
              <ListItemIcon>
                <VpnKeyOutlinedIcon />
              </ListItemIcon>
              <ListItemText primary="Log In" />
            </ListItem>
            <ListItem button onClick={() => events.registerClicked()}>
              <ListItemIcon>
                <CreateOutlinedIcon />
              </ListItemIcon>
              <ListItemText primary="Register" />
            </ListItem>
          </>
        )}
      </List>
    </div>
  );
};

export default SideMenu;
