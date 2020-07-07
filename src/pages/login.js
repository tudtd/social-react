import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

// MUI
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Gird from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles((theme) => ({
  ...theme.util,
}));

const Login = (props) => {
  const classes = useStyles();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    const userData = {
      email: email,
      password: password,
    };

    axios
      .post("/login", userData)
      .then((res) => {
        setLoading(false);
        localStorage.setItem("FBIdToken", `Bearer ${res.data.token}`);
        props.history.push("/");
      })
      .catch((err) => {
        setLoading(false);
        setErrors(err.response.data);
      });
  };

  return (
    <div>
      <Gird container className={classes.container}>
        <Gird item sm></Gird>
        <Gird item sm>
          <Typography variant="h2" className={classes.heading}>
            Login
          </Typography>

          <form
            noValidate
            autoComplete="off"
            className={classes.form}
            onSubmit={handleFormSubmit}
          >
            <TextField
              id="email"
              type="email"
              name="email"
              label="Email"
              helperText={errors.email}
              error={errors.email ? true : false}
              className={classes.field}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              id="password"
              type="password"
              name="password"
              label="Password"
              helperText={errors.password}
              error={errors.password ? true : false}
              className={classes.field}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Typography variant="body2" className={classes.customError}>
              {errors.general && errors.general}
            </Typography>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.button}
              disabled={loading}
            >
              Login
              {loading && (
                <CircularProgress size={30} className={classes.loading} />
              )}
            </Button>
          </form>

          <Typography variant="body2">
            Don't have an account? Signup <Link to="/signup">here</Link>!
          </Typography>
        </Gird>
        <Gird item sm></Gird>
      </Gird>
    </div>
  );
};

export default Login;
