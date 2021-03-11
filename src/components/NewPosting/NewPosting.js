import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  TextField,
  Container,
  CssBaseline,
  Grid,
  Button,
  CardHeader,
  Typography,
  Select,
  MenuItem,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 0),
    fontSize: 19,
  },
}));

const NewPosting = ({ error, submit, regions, getCities, cities, post }) => {
  const classes = useStyles();
  const [title, setTitle] = useState(post ? post.title : "");
  const [price, setPrice] = useState(post ? post.price : "");
  const [imageRef, setImageRef] = useState(post ? post.image : "");
  const [category, setCategory] = useState(post ? post.category : "");
  const [city, setCity] = useState(post ? post.city : "");
  const [province, setProvince] = useState(post ? post.region : "");
  const [description, setDescription] = useState(post ? post.description : "");

  useEffect(() => {
    if (province) {
      getCities(province);
    }
  }, []);

  const handleSubmit = (e) => {
    // Prevent refresh
    e.preventDefault();

    // Convert price from string -> int
    let priceFloat = parseFloat(price);
    let rounded = parseFloat(priceFloat.toFixed(2));

    // Replace ' => ''
    const regDesc = description.replace(/'/g, "''");
    const regTitle = title.replace(/'/g, "''");

    // Submit form
    submit({
      title: title.includes(`'`) ? regTitle : title,
      price: rounded,
      image_ref: imageRef,
      category,
      city,
      province,
      seller_description: description.includes(`'`) ? regDesc : description,
    });

    // Reset state
    // setTitle("");
    // setPrice("");
    // setImageRef("");
    // setCategory("");
    // setCity("");
    // setProvince("");
    // setDescription("");
  };

  return (
    <Container component="main" maxWidth="sm">
      <CssBaseline />
      <div className={classes.paper}>
        <CardHeader
          className={classes.header}
          title={post ? "Update My Post" : "Sell Something"}
        />
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete="title"
                name="title"
                variant="outlined"
                required
                fullWidth
                id="title"
                label="Title"
                autoFocus
                value={title || ""}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="price"
                label="$$ Price"
                name="price"
                type="number"
                inputProps={{ min: 0, step: 0.01 }}
                autoComplete="price"
                value={price || ""}
                onChange={(e) => setPrice(e.target.value)}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                variant="outlined"
                type="url"
                required
                fullWidth
                name="imageRef"
                label="Image"
                id="imageRef"
                value={imageRef || ""}
                onChange={(e) => setImageRef(e.target.value)}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                variant="outlined"
                select
                required
                fullWidth
                name="category"
                label="Category"
                id="category"
                value={category || ""}
                onChange={(e) => setCategory(e.target.value)}
              >
                <MenuItem value={"Tops"}>Tops</MenuItem>
                <MenuItem value={"Bottoms"}>Bottoms</MenuItem>
                <MenuItem value={"Shoes"}>Shoes</MenuItem>
                <MenuItem value={"Collectables"}>Items</MenuItem>
                <MenuItem value={"Misc"}>Misc</MenuItem>
              </TextField>
            </Grid>

            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                select
                fullWidth
                name="province"
                label="Province"
                id="province"
                value={province || ""}
                onChange={(e) => {
                  setProvince(e.target.value);
                  getCities(e.target.value);
                }}
              >
                {regions.map((region) => (
                  <MenuItem key={region} value={region}>
                    {region}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                select
                fullWidth
                name="city"
                label="City"
                id="city"
                value={city || ""}
                onChange={(e) => setCity(e.target.value)}
              >
                {cities ? (
                  cities.map((city) => (
                    <MenuItem key={city} value={city}>
                      {city}
                    </MenuItem>
                  ))
                ) : (
                  <MenuItem value={""}>Choose a province</MenuItem>
                )}
              </TextField>
            </Grid>

            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                multiline
                rows={6}
                name="description"
                label="Description"
                id="description"
                value={description || ""}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Grid>
          </Grid>
          {!!error && <Typography>{error}</Typography>}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Submit
          </Button>
        </form>
      </div>
    </Container>
  );
};

export default NewPosting;
