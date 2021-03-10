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

import EmailIcon from "@material-ui/icons/Email";
import FavoriteIcon from "@material-ui/icons/Favorite";

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
  },
  title: {
    marginTop: 20,
  },
});

const ProductItem = ({
  post,
  likeClicked,
  cardClicked,
  contactClicked,
  myPostings,
  editClicked,
  deleteClicked,
}) => {
  const classes = useStyles();

  const substringTitle = post.title.substring(0, 19);
  return (
    <Card className={classes.root}>
      <CardActionArea onClick={() => cardClicked()}>
        <CardMedia
          component="img"
          alt={post.title}
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
              <Typography gutterBottom className={classes.title}>
                {post.title.length < 20 ? post.title : `${substringTitle} ...`}
              </Typography>
            </div>
            <div>
              <Typography>{post.city}</Typography>
            </div>
          </div>

          {/* <Typography variant="body2" color="textSecondary" component="p">
            {post.description}
          </Typography> */}
        </CardContent>
      </CardActionArea>
      <CardActions className={classes.header}>
        {myPostings ? (
          <>
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
          </>
        ) : (
          <>
            <IconButton aria-label="add to favorites">
              <FavoriteIcon onClick={() => likeClicked()} />
            </IconButton>
            <IconButton
              onClick={() => contactClicked()}
              size="small"
              color="primary"
            >
              <EmailIcon />
            </IconButton>
          </>
        )}
      </CardActions>
    </Card>
  );
};

export default ProductItem;
