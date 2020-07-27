import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const AuthRoute = ({ component: Component, authenticated, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      authenticated === true ? <Redirect to="/" /> : <Component {...props} />
    }
  />
);

const mapDispatchToProps = (state) => {
  return {
    authenticated: state.authenticated,
  };
};

export default connect(mapDispatchToProps)(AuthRoute);
