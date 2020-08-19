import React, { useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';

import Scream from '../components/Scream';
import Profile from '../components/Profile';

// REDUX
import { connect } from 'react-redux';
import { getScreams } from '../actions/data';

const Home = (props) => {
  const { screams, loading } = props.data;

  const { getScreams } = props;

  useEffect(() => {
    getScreams();
  }, []);

  return (
    <Grid container>
      <Grid item xs={12} sm={4}>
        <Profile />
      </Grid>
      <Grid item xs={12} sm={8}>
        {!loading ? (
          screams.map((scream) => {
            return <Scream key={scream.screamId} {...scream} />;
          })
        ) : (
          <p>Loading...</p>
        )}
      </Grid>
    </Grid>
  );
};

const mapStateToProps = (state) => ({
  data: state.data,
});

Home.propTypes = {
  data: PropTypes.object.isRequired,
  getScreams: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, { getScreams })(Home);
