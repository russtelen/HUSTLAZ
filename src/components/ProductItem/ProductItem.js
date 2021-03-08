import React, { useState, useEffect } from "react";

import { makeStyles } from "@material-ui/core/styles";

import {
  IconButton,
  Typography,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Button,
} from "@material-ui/core";

import FavoriteIcon from "@material-ui/icons/Favorite";

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
  },
});

const ProductItem = ({ post, likeClicked, cardClicked, contactClicked }) => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardActionArea onClick={() => cardClicked()}>
        <CardMedia
          component="img"
          alt="Contemplative Reptile"
          height="300"
          image={post.image}
          title="Contemplative Reptile"
        />
        <CardContent>
          <div className={classes.header}>
            <div>
              <Typography variant="h5" component="h1">
                $ {post.price}
              </Typography>
              <Typography gutterBottom>{post.title}</Typography>
            </div>
            <div>
              <Typography>{post.city}</Typography>
            </div>
          </div>

          <Typography variant="body2" color="textSecondary" component="p">
            {post.description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions className={classes.header}>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon onClick={() => likeClicked()} />
        </IconButton>
        <Button onClick={() => contactClicked()} size="small" color="primary">
          Contact Seller
        </Button>
      </CardActions>
    </Card>
  );
};

export default ProductItem;
