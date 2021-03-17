import React, { useState, useEffect } from "react"

import { makeStyles } from "@material-ui/core/styles"

import {
  IconButton,
  Typography,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
} from "@material-ui/core"

import EmailIcon from "@material-ui/icons/Email"
import FavoriteIcon from "@material-ui/icons/Favorite"
import EditIcon from "@material-ui/icons/Edit"
import DeleteForeverIcon from "@material-ui/icons/DeleteForever"
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder"

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
})

const ProductItem = ({
  post,
  likeClicked,
  favourite,
  cardClicked,
  contactClicked,
  myPostings,
  editClicked,
  deleteClicked,
  user,
}) => {
  const classes = useStyles()

  const [liked, setLiked] = useState(favourite)

  useEffect(() => {
    setLiked(favourite)
  }, [favourite])

  const postLiked = () => {
    if (user) {
      setLiked(!liked)
    }
    likeClicked({ postingId: post.id, liked })
  }

  const substringTitle = post.title.substring(0, 19)
  return (
    <Card className={`${classes.root}`}>
      <CardActionArea onClick={() => cardClicked()}>
        <CardMedia
          component="img"
          alt={post.title}
          height="300"
          image={post.image}
          title={post.title}
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
              <Typography variant="caption">
                {post.city}, {post.region}
              </Typography>
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
            <IconButton
              variant="contained"
              style={{ background: "orange", color: "white", opacity: "0.6" }}
              onClick={() => editClicked()}
            >
              <EditIcon />
            </IconButton>
            <IconButton
              onClick={() => deleteClicked()}
              variant="contained"
              style={{ background: "red", color: "white", opacity: "0.6" }}
            >
              <DeleteForeverIcon />
            </IconButton>
          </>
        ) : (
          <>
            <IconButton
              aria-label="add to favorites"
              onClick={() => postLiked()}
            >
              {liked ? (
                <FavoriteIcon color="secondary" />
              ) : (
                <FavoriteBorderIcon />
              )}
            </IconButton>
            <IconButton onClick={() => contactClicked()}>
              <EmailIcon />
            </IconButton>
          </>
        )}
      </CardActions>
    </Card>
  )
}

export default ProductItem
