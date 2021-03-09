import React, { useContext } from "react";
import { UserContext } from "../../context/UserContext";

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
import ExitToAppOutlinedIcon from "@material-ui/icons/ExitToAppOutlined";
import VpnKeyOutlinedIcon from "@material-ui/icons/VpnKeyOutlined";
import CreateOutlinedIcon from "@material-ui/icons/CreateOutlined";
import { FaTshirt, FaRecordVinyl, FaCrown } from "react-icons/fa";
import { GiArmoredPants, GiConverseShoe } from "react-icons/gi";

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

const SideMenu = ({
  topPicksClicked,
  topsCatClicked,
  bottomsCatClicked,
  shoesCatClicked,
  itemsCatClicked,
  miscCatClicked,
  sellSomethingClicked,
  searchClicked,
  loginClicked,
  registerClicked,
  logoutClicked,
}) => {
  const classes = useStyles();
  const { user, setUser } = useContext(UserContext);
  const [open, setOpen] = React.useState(true);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <List>
        <ListItem button onClick={() => topPicksClicked()}>
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
              onClick={() => topsCatClicked()}
            >
              <ListItemIcon>
                <FaTshirt size={20} />
              </ListItemIcon>
              <ListItemText primary="Tops" />
            </ListItem>
            <ListItem
              button
              className={classes.nested}
              onClick={() => bottomsCatClicked()}
            >
              <ListItemIcon>
                <GiArmoredPants size={20} />
              </ListItemIcon>
              <ListItemText primary="Bottoms" />
            </ListItem>
            <ListItem
              button
              className={classes.nested}
              onClick={() => shoesCatClicked()}
            >
              <ListItemIcon>
                <GiConverseShoe size={20} />
              </ListItemIcon>
              <ListItemText primary="Shoes" />
            </ListItem>
            <ListItem
              button
              className={classes.nested}
              onClick={() => itemsCatClicked()}
            >
              <ListItemIcon>
                <FaRecordVinyl size={20} />
              </ListItemIcon>
              <ListItemText primary="Items" />
            </ListItem>
            <ListItem
              button
              className={classes.nested}
              onClick={() => miscCatClicked()}
            >
              <ListItemIcon>
                <FaCrown size={20} />
              </ListItemIcon>
              <ListItemText primary="Misc" />
            </ListItem>
          </List>
        </Collapse>
        <ListItem button onClick={() => sellSomethingClicked()}>
          <ListItemIcon>
            <ControlPointOutlinedIcon />
          </ListItemIcon>
          <ListItemText primary="Sell Something" />
        </ListItem>
        <ListItem button onClick={() => searchClicked()}>
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
            <ListItem button onClick={() => logoutClicked()}>
              <ListItemIcon>
                <ExitToAppOutlinedIcon />
              </ListItemIcon>
              <ListItemText primary="Log Out" />
            </ListItem>
          </>
        ) : (
          <>
            <ListItem button onClick={() => loginClicked()}>
              <ListItemIcon>
                <VpnKeyOutlinedIcon />
              </ListItemIcon>
              <ListItemText primary="Log In" />
            </ListItem>
            <ListItem button onClick={() => registerClicked()}>
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
