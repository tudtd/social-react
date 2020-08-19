import React from 'react';
import { Link } from 'react-router-dom';
import CustomButton from '../util/CustomButton';
import PropTypes from 'prop-types';
import AddScream from '../components/AddScream';

//MUI
import AppBar from '@material-ui/core/AppBar';
import ToolBar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';

// MUI Icons

import NotificationsIcon from '@material-ui/icons/Notifications';
import HomeIcon from '@material-ui/icons/Home';

// REDUX
import { connect } from 'react-redux';

const Navbar = ({ authenticated }) => {
  const navbar = authenticated ? (
    <AppBar position="fixed">
      <ToolBar className="nav-container">
        <Link to="/">
          <CustomButton tip="Home">
            <HomeIcon />
          </CustomButton>
        </Link>
        {/* <CustomButton tip="Add a Scream">
          <AddIcon />
        </CustomButton> */}
        <AddScream />
        <CustomButton tip="Notifications">
          <NotificationsIcon />
        </CustomButton>
      </ToolBar>
    </AppBar>
  ) : (
    <AppBar position="fixed">
      <ToolBar className="nav-container">
        <Button color="inherit" component={Link} to="/">
          Home
        </Button>
        <Button color="inherit" component={Link} to="/login">
          Login
        </Button>
        <Button color="inherit" component={Link} to="/signup">
          Signup
        </Button>
      </ToolBar>
    </AppBar>
  );

  return navbar;
};

const mapStateToProps = (state) => ({
  authenticated: state.user.authenticated,
});

Navbar.propTypes = {
  authenticated: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps)(Navbar);
