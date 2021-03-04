import React, { useState } from "react"
import { makeStyles } from "@material-ui/core/styles"

import {
  TextField,
  Container,
  CssBaseline,
  Grid,
  Avatar,
  LockOutlinedIcon,
  Button,
  CardHeader,
  Typography,
  FormControlLabel,
  Tabs,
  Tab,
} from "@material-ui/core"
import {
  FacebookLoginButton,
  GoogleLoginButton,
  TwitterLoginButton,
} from "react-social-login-buttons"
import CloseIcon from "@material-ui/icons/Close"

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
}))

const Login = ({ onSubmit, onClose, error }) => {
  const classes = useStyles()

  const [tabValue, setTabValue] = useState(0)
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const submit = (event) => {
    event.preventDefault()
    if (tabValue === 0) {
      onSubmit({ type: "login", username, password })
    } else {
      onSubmit({ type: "signUp", email, username, password })
    }
    setEmail("")
    setUsername("")
    setPassword("")
  }

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue)
  }

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
        <form className={classes.form} noValidate>
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
              />
            </Grid>
          </Grid>
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
  )
}

export default Login
