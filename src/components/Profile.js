import React from 'react';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';

// MUI
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import LinkIcon from '@material-ui/icons/Link';
import CalendarToday from '@material-ui/icons/CalendarToday';
import LocationOn from '@material-ui/icons/LocationOn';
import Typography from '@material-ui/core/Typography';

// REDUX
import { connect } from 'react-redux';

const useStyles = makeStyles((theme) => ({
  paper: {
    margin: '20px 40px 20px 0',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    textAlign: 'center',
    alignItems: 'center',
    padding: '20px',
    color: 'rgba(0,0,0, .54)',
    fontSize: '0.875rem',
  },
  avatarWrapper: {
    width: 200,
    height: 200,
  },
  avatarImage: {
    width: '100%',
    objectFit: 'cover',
    borderRadius: '50%',
  },
}));

const Profile = (props) => {
  const classes = useStyles();

  const {
    user: {
      credentials: { handle, bio, imageUrl, website, location, createdAt },
    },
  } = props;

  return (
    <div>
      <Paper className={classes.paper}>
        <div className={classes.avatarWrapper}>
          <img className={classes.avatarImage} src={imageUrl} alt="avatar" />
        </div>

        <div className="username">
          <Typography color="primary" variant="body1">
            @{handle}
          </Typography>
        </div>
        <div className="bio">{bio}</div>
        <div className="location">
          <LocationOn color="primary" />
          {location && location}
        </div>
        <div className="website">
          <LinkIcon color="primary" />
          {website && <a href={website}>{website}</a>}
        </div>
        <div className="created-at">
          <CalendarToday color="primary" />
          {createdAt && dayjs(createdAt).format('MMM YYYY')}
        </div>
      </Paper>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

Profile.propTypes = {
  user: PropTypes.object.isRequired,
};

export default connect(mapStateToProps)(Profile);
