import React, { useState } from "react";
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

const NewPosting = ({ error, submit }) => {
  const classes = useStyles();
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState(0);
  const [imageRef, setImageRef] = useState("");
  const [category, setCategory] = useState("");
  const [city, setCity] = useState("");
  const [province, setProvince] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    // Prevent refresh
    e.preventDefault();

    // Convert price from string -> int
    let priceFloat = parseFloat(price);
    let rounded = parseFloat(priceFloat.toFixed(2));

    // Submit form
    submit({
      title,
      price: rounded,
      image_ref: imageRef,
      category,
      city,
      province,
      seller_description: description,
    });

    // Reset state
    setTitle("");
    setPrice("");
    setImageRef("");
    setCategory("");
    setCity("");
    setProvince("");
    setDescription("");
  };

  return (
    <Container component="main" maxWidth="sm">
      <CssBaseline />
      <div className={classes.paper}>
        <CardHeader className={classes.header} title="Sell Something" />
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
                fullWidth
                name="city"
                label="City"
                id="city"
                value={city || ""}
                onChange={(e) => setCity(e.target.value)}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="province"
                label="Province"
                id="province"
                value={province || ""}
                onChange={(e) => setProvince(e.target.value)}
              />
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
