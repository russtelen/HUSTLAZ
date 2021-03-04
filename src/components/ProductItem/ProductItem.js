import React, { useState, useEffect, Fragment } from "react"

import { makeStyles } from "@material-ui/core/styles"

import {
  Avatar,
  CardHeader,
  IconButton,
  Typography,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Button,
} from "@material-ui/core"

import FavoriteIcon from "@material-ui/icons/Favorite"

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
  },
})

const ProductItem = ({ name, price, imageUrl }) => {
  const classes = useStyles()
  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          component="img"
          alt="Contemplative Reptile"
          height="140"
          image="https://cdn.motor1.com/images/mgl/Yp07j/s1/tesla-pricing-lead.jpg"
          title="Contemplative Reptile"
        />
        <CardContent>
          <div className={classes.header}>
            <div>
              <Typography variant="h5" component="h1">
                $ 200,000
              </Typography>
              <Typography gutterBottom>Tesla Roadster</Typography>
            </div>
            <div>
              <Typography>Vancouver, BC</Typography>
            </div>
          </div>

          <Typography variant="body2" color="textSecondary" component="p">
            Elon Musk's new baby. Lorem ipsum dolor sit amet consectetur
            adipisicing elit.
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions className={classes.header}>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <Button size="small" color="primary">
          Contact Seller
        </Button>
      </CardActions>
    </Card>
  )
}

export default ProductItem
