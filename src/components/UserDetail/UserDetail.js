import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { IconButton, Avatar } from "@material-ui/core";

import LocationOnIcon from "@material-ui/icons/LocationOn";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import PhoneIcon from "@material-ui/icons/Phone";
import EditIcon from "@material-ui/icons/Edit";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    margin: "auto",
    maxWidth: 600,
  },
  header: {
    padding: theme.spacing(0, 0, 2),
  },
  info: {
    marginBottom: "2em",
  },
  icons: {
    marginRight: 12,
  },
  large: {
    width: theme.spacing(25),
    height: theme.spacing(25),
  },
}));

const UserDetail = ({ user, editClicked }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Grid item container justify="flex-end">
          <Grid item>
            <IconButton onClick={() => editClicked()}>
              <EditIcon align="right" />
            </IconButton>
          </Grid>
        </Grid>
        <Grid container spacing={5} style={{ padding: 20 }}>
          <Grid item direction="column" spacing={4}>
            <Grid item>
              <Avatar src={user.image || ""} className={classes.large} />
            </Grid>
          </Grid>
          <Grid item xs={6} sm container>
            <Grid item xs>
              <Grid container item className={classes.info}>
                <Grid>
                  <AccountCircleIcon className={classes.icons} />
                </Grid>
                <Grid>
                  <Typography variant="h6">Username</Typography>
                  <Typography variant="body1" color="textSecondary">
                    {user.username}
                  </Typography>
                </Grid>
              </Grid>
              {/* <Grid item className={classes.info} container direction="row">
                <Grid item>
                  <DescriptionIcon className={classes.icons} />
                </Grid>
                <Grid item xs={10}>
                  <Typography variant="h6">Description</Typography>
                  <Typography variant="body2" color="textSecondary">
                    {user.description}
                  </Typography>
                </Grid>
              </Grid> */}
              <Grid item className={classes.info} container>
                <Grid item>
                  <LocationOnIcon className={classes.icons} />
                </Grid>
                <Grid>
                  <Typography variant="h6">Address</Typography>
                  <Typography variant="body1" color="textSecondary">
                    {user.address}
                  </Typography>
                </Grid>
              </Grid>
              <Grid container className={classes.info}>
                <Grid>
                  <PhoneIcon className={classes.icons} />
                </Grid>
                <Grid>
                  <Typography variant="h6">Contact</Typography>
                  <Typography variant="body1" color="textSecondary">
                    {user.email}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
};
export default UserDetail;
