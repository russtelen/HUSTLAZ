import React, { useState, useContext } from "react";
import { LoginFormContext } from "../../context/LoginFormContext";
import { makeStyles } from "@material-ui/core/styles";
import {
  TextField,
  Container,
  CssBaseline,
  Grid,
  Button,
  CardHeader,
  Typography,
  Tabs,
  Tab,
} from "@material-ui/core";
import {
  FacebookLoginButton,
  GoogleLoginButton,
  TwitterLoginButton,
} from "react-social-login-buttons";

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
  social: {
    margin: 50,
  },
  tabs: {
    margin: "auto",
    width: "100%",
  },
}));

const Login = ({ onSubmit, error }) => {
  const classes = useStyles();
  // Context
  const { tabValue, setTabValue } = useContext(LoginFormContext);
  // const [tabValue, setTabValue] = useState(0);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const submit = (event) => {
    event.preventDefault();
    if (tabValue === 0) {
      onSubmit({ type: "login", username, password });
    } else {
      onSubmit({ type: "signUp", email, username, password });
    }
    setEmail("");
    setUsername("");
    setPassword("");
    setConfirmPassword("");
  };

  const handleTabChange = (_, newValue) => {
    setTabValue(newValue);
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <CardHeader
          className={classes.header}
          title={tabValue === 0 ? "Login" : "Sign Up"}
        />
        <Tabs
          variant="fullWidth"
          className={classes.tabs}
          value={tabValue}
          indicatorColor="primary"
          textColor="primary"
          onChange={handleTabChange}
        >
          <Tab label="Login" />
          <Tab label="Sign Up" />
        </Tabs>
        <form className={classes.form} onSubmit={submit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete="uname"
                name="Username"
                variant="outlined"
                required
                fullWidth
                id="username"
                label="User Name"
                autoFocus
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </Grid>

            {tabValue === 1 && (
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Grid>
            )}
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Grid>
            {tabValue === 1 && (
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="con-password"
                  label="Confirm Password"
                  type="password"
                  id="con-password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </Grid>
            )}
          </Grid>
          {!!error && <Typography>{error}</Typography>}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            {tabValue === 1 ? "Sign Up" : "Login"}
          </Button>
        </form>
        <Typography style={{ margin: 30 }} color="textSecondary">
          OR
        </Typography>
        <div style={{ width: "100%" }}>
          <FacebookLoginButton
            text={
              tabValue === 1 ? "Sign up with Facebook" : "Login with Facebook"
            }
            style={{ marginBottom: 15 }}
          />
          <GoogleLoginButton
            text={tabValue === 1 ? "Sign up with Google" : "Login with Google"}
            style={{ marginBottom: 15 }}
          />
          <TwitterLoginButton
            text={
              tabValue === 1 ? "Sign up with Twitter" : "Login with Twitter"
            }
            style={{ marginBottom: 15 }}
          />
        </div>
      </div>
    </Container>
  );
};

export default Login;
