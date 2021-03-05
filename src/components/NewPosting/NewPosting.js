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

import AttachMoneyIcon from "@material-ui/icons/AttachMoney";

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

const NewPosting = ({ error }) => {
  const classes = useStyles();
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <CardHeader className={classes.header} title="Sell Something" />
        <form className={classes.form}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete="name"
                name="product_name"
                variant="outlined"
                required
                fullWidth
                id="productname"
                label="Prduct Name"
                autoFocus
                // value={username}
                // onChange={(e) => setUsername(e.target.value)}
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
                autoComplete="price"
                //   value={email}
                //   onChange={(e) => setEmail(e.target.value)}
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
                // value={password}
                // onChange={(e) => setPassword(e.target.value)}
              >
                <MenuItem value={"cat1"}>Category 1</MenuItem>
                <MenuItem value={"cat2"}>Category 2</MenuItem>
                <MenuItem value={"cat3"}>Category 3</MenuItem>
                <MenuItem value={"cat4"}>Category 4</MenuItem>
                <MenuItem value={"cat5"}>Category 5</MenuItem>
              </TextField>
            </Grid>

            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="location"
                label="Location"
                id="location"
                //   value={confirmPassword}
                //   onChange={(e) => setConfirmPassword(e.target.value)}
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
                //   value={confirmPassword}
                //   onChange={(e) => setConfirmPassword(e.target.value)}
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
                //   value={confirmPassword}
                //   onChange={(e) => setConfirmPassword(e.target.value)}
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
