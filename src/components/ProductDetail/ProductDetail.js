import React, { useState, useEffect } from "react"
import { makeStyles } from "@material-ui/core/styles"
import Grid from "@material-ui/core/Grid"
import Paper from "@material-ui/core/Paper"
import Typography from "@material-ui/core/Typography"
import ButtonBase from "@material-ui/core/ButtonBase"
import {
  CardMedia,
  GridList,
  Button,
  IconButton,
  ButtonGroup,
} from "@material-ui/core"

import CloseIcon from "@material-ui/icons/Close"
import LocationOnIcon from "@material-ui/icons/LocationOn"
import AccountCircleIcon from "@material-ui/icons/AccountCircle"
import PhoneIcon from "@material-ui/icons/Phone"
import DescriptionIcon from "@material-ui/icons/Description"

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    margin: "auto",
    maxWidth: 800,
    minHeight: 300,
  },
  header: {
    padding: theme.spacing(0, 0, 2),
  },
  image: {
    width: "100%",
    height: 300,
  },
  img: {
    margin: "auto",
    display: "block",
    maxWidth: "100%",
    maxHeight: "100%",
  },
  smallImage: {
    width: 100,
    height: 100,
  },
  info: {
    marginBottom: "2em",
  },
  gridList: {
    flexWrap: "nowrap",
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: "translateZ(0)",
  },
  icons: {
    marginRight: 12,
  },
}))

const ProductDetail = ({
  post,
  closeClicked,
  editClicked,
  deleteClicked,
  imageClicked,
}) => {
  const classes = useStyles()

  const onClose = () => {
    closeClicked()
  }

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Grid item container justify="space-between">
          <IconButton aria-label="close" onClick={onClose}>
            <CloseIcon />
          </IconButton>
          <Grid item>
            <ButtonGroup>
              <Button
                variant="contained"
                style={{ background: "orange" }}
                onClick={() => editClicked()}
              >
                Edit
              </Button>
              <Button
                onClick={() => deleteClicked()}
                variant="contained"
                color="secondary"
              >
                Delete
              </Button>
            </ButtonGroup>
          </Grid>
        </Grid>
        <Grid container spacing={5} style={{ padding: 20 }}>
          <Grid item xs={7} direction="column" spacing={4}>
            <Grid container justify="space-between" className={classes.header}>
              <Typography variant="h6">{post.title} </Typography>
              <Typography variant="h6">$ {post.price}</Typography>
            </Grid>
            <Grid item>
              <CardMedia
                className={classes.image}
                component="img"
                alt="tesla"
                image={post.images[0]}
                title="tesla"
              />
            </Grid>

            <div className=""></div>
            <Grid item xs={12} container justify="space-between">
              <GridList className={classes.gridList} cols={2}>
                {post?.images.map((image, idx) => {
                  return (
                    <CardMedia
                      key={idx}
                      component="img"
                      image={image}
                      className={classes.smallImage}
                      onClick={() => imageClicked()}
                    />
                  )
                })}
              </GridList>
            </Grid>
          </Grid>
          <Grid item xs={4} sm container>
            <Grid item xs>
              <Grid container item className={classes.info}>
                <Grid>
                  <AccountCircleIcon className={classes.icons} />
                </Grid>
                <Grid>
                  <Typography gutterBottom variant="h6">
                    {post.username}
                  </Typography>
                </Grid>
              </Grid>
              <Grid item className={classes.info} container direction="row">
                <Grid item>
                  <DescriptionIcon className={classes.icons} />
                </Grid>
                <Grid item xs={10}>
                  <Typography variant="h6">Description</Typography>
                  <Typography variant="body2" color="textSecondary">
                    {post.desc}
                  </Typography>
                </Grid>
              </Grid>
              <Grid item className={classes.info} container>
                <Grid item>
                  <LocationOnIcon className={classes.icons} />
                </Grid>
                <Grid>
                  <Typography variant="h6">Location</Typography>
                  <Typography variant="body2" color="textSecondary">
                    {post.city}
                  </Typography>
                </Grid>
              </Grid>
              <Grid container className={classes.info}>
                <Grid>
                  <PhoneIcon className={classes.icons} />
                </Grid>
                <Grid>
                  <Typography variant="h6">Contact</Typography>
                  <Typography variant="body2" color="textSecondary">
                    {post.contact}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </div>
  )
}
export default ProductDetail
