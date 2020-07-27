import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

// MUI
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Gird from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

// REDUX
import { connect } from 'react-redux';
import { signupUser } from '../actions/user';

const useStyles = makeStyles((theme) => ({
  ...theme.util,
}));

const Signup = (props) => {
  const classes = useStyles();

  const [handle, setHandle] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  // const [errors, setErrors] = useState({});

  const {
    UI: { loading, errors },
  } = props;
  const handleFormSubmit = (e) => {
    e.preventDefault();

    const newUserData = {
      handle: handle,
      email: email,
      password: password,
      confirmPassword: confirmPassword,
    };

    props.signupUser(newUserData, props.history);
  };

  return (
    <div>
      <Gird container className={classes.container}>
        <Gird item sm></Gird>
        <Gird item sm>
          <Typography variant="h2" className={classes.heading}>
            Signup
          </Typography>

          <form
            noValidate
            autoComplete="off"
            className={classes.form}
            onSubmit={handleFormSubmit}
          >
            <TextField
              id="handle"
              type="text"
              name="handle"
              label="Your Name"
              helperText={errors.handle}
              error={errors.handle ? true : false}
              className={classes.field}
              value={handle}
              onChange={(e) => setHandle(e.target.value)}
            />

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
            <TextField
              id="confirmPassword"
              type="password"
              name="confirmPassword"
              label="Confirm Password"
              helperText={errors.confirmPassword}
              error={errors.confirmPassword ? true : false}
              className={classes.field}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
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
              Signup
              {loading && (
                <CircularProgress size={30} className={classes.loading} />
              )}
            </Button>
          </form>

          <Typography variant="body2">
            Already have an account? Login <Link to="/login">here</Link>!
          </Typography>
        </Gird>
        <Gird item sm></Gird>
      </Gird>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
    UI: state.UI,
  };
};

Signup.propTypes = {
  user: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired,
  signupUser: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, { signupUser })(Signup);
