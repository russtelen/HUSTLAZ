import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import Grid from "@material-ui/core/Grid"
import Paper from "@material-ui/core/Paper"
import Typography from "@material-ui/core/Typography"
import { CardMedia, IconButton, ButtonGroup } from "@material-ui/core"
import CloseIcon from "@material-ui/icons/Close"
import EmailIcon from "@material-ui/icons/Email"
import LocationOnIcon from "@material-ui/icons/LocationOn"
import AccountCircleIcon from "@material-ui/icons/AccountCircle"
import PhoneIcon from "@material-ui/icons/Phone"
import DescriptionIcon from "@material-ui/icons/Description"
import EditIcon from "@material-ui/icons/Edit"
import DeleteForeverIcon from "@material-ui/icons/DeleteForever"
import ContactMailIcon from "@material-ui/icons/ContactMail"

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
    padding: theme.spacing(1, 2),
  },
  image: {
    width: "100%",
    maxHeight: 900,
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
  isAuthorized,
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
          {isAuthorized && (
            <Grid item>
              <ButtonGroup>
                <IconButton
                  variant="contained"
                  style={{
                    background: "orange",
                    color: "white",
                    opacity: "0.6",
                  }}
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
              </ButtonGroup>
            </Grid>
          )}
        </Grid>
        <Grid>
          <Grid container justify="space-between" className={classes.header}>
            <Grid xs={6}>
              <Typography variant="h6">{post.title} </Typography>
            </Grid>
            <Grid xs={6}>
              <Typography align="right" variant="h4">
                $ {post.price}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid container spacing={5} style={{ padding: 20 }}>
          <Grid item xs={6} direction="column" spacing={4}>
            <Grid item>
              <CardMedia
                className={classes.image}
                component="img"
                alt={post.title}
                image={post.image}
                title={post.title}
              />
            </Grid>

            <div className=""></div>
            {/* <Grid item xs={12} container justify="space-between">
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
            </Grid> */}
          </Grid>
          <Grid item xs={6} sm container>
            <Grid item xs>
              <Grid container item className={classes.info}>
                <Grid>
                  <AccountCircleIcon className={classes.icons} />
                </Grid>
                <Grid>
                  <Typography gutterBottom variant="h6">
                    {post.author}
                  </Typography>
                </Grid>
              </Grid>
              <Grid item className={classes.info} container direction="row">
                <Grid item>
                  <DescriptionIcon className={classes.icons} />
                </Grid>
                <Grid item xs={10}>
                  <Typography gutterBottom variant="h6">
                    Description
                  </Typography>
                  <div
                    style={{
                      maxHeight: 250,
                      overflow: "auto",
                      whiteSpace: "pre-line",
                    }}
                  >
                    <Typography variant="body2" color="textSecondary">
                      {post.description}
                    </Typography>
                  </div>
                </Grid>
              </Grid>
              <Grid item className={classes.info} container>
                <Grid item>
                  <LocationOnIcon className={classes.icons} />
                </Grid>
                <Grid>
                  <Typography gutterBottom variant="h6">
                    Location
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {post.city}, {post.region}
                  </Typography>
                </Grid>
              </Grid>
              <Grid container className={classes.info}>
                <Grid>
                  <ContactMailIcon className={classes.icons} />
                </Grid>
                <Grid>
                  <Typography gutterBottom variant="h6">
                    Contact
                  </Typography>
                  <Typography
                    gutterBottom
                    variant="body2"
                    color="textSecondary"
                  >
                    {post.contact && (
                      <>
                        <EmailIcon className={classes.icons} />
                        {post.contact}
                      </>
                    )}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {post.phoneNumber && (
                      <>
                        {" "}
                        <PhoneIcon className={classes.icons} />{" "}
                        {post.phoneNumber}
                      </>
                    )}
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
