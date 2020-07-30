import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';
import EditDetails from './EditDetails';

// MUI
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import MuiLink from '@material-ui/core/Link';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';

// MUI Icons
import LinkIcon from '@material-ui/icons/Link';
import CalendarToday from '@material-ui/icons/CalendarToday';
import LocationOn from '@material-ui/icons/LocationOn';
import EditIcon from '@material-ui/icons/Edit';
import LogoutIcon from '@material-ui/icons/KeyboardBackspace';

// REDUX
import { connect } from 'react-redux';
import { uploadUserAvatar, logoutUser } from '../actions/user';

const useStyles = makeStyles((theme) => ({
  paper: {
    margin: 20,
    padding: 20,
  },
  profile: {
    '& .image-wrapper': {
      textAlign: 'center',
      position: 'relative',
      '& button': {
        position: 'absolute',
        top: '80%',
        left: '70%',
      },
    },
    '& .profile-image': {
      width: 200,
      height: 200,
      objectFit: 'cover',
      maxWidth: '100%',
      borderRadius: '50%',
    },
    '& .profile-details': {
      textAlign: 'center',
      '& span, svg': {
        verticalAlign: 'middle',
      },
      '& a': {
        color: theme.palette.primary.main,
      },
    },
    '& hr': {
      border: 'none',
      margin: '0 0 10px 0',
    },
    '& svg.button': {
      '&:hover': {
        cursor: 'pointer',
      },
    },
  },
  buttons: {
    textAlign: 'center',
    '& a': {
      margin: '20px 10px',
    },
  },
}));

const Profile = (props) => {
  const classes = useStyles();
  // const editButtonEl = useRef(null);

  const {
    user: {
      credentials: { handle, bio, imageUrl, website, location, createdAt },
      loading,
      authenticated,
    },
  } = props;

  const handleUploadUserAvatar = (e) => {
    const image = e.target.files[0];
    const formData = new FormData();
    console.log(image);
    formData.append('image', image, image.name);
    props.uploadUserAvatar(formData);
  };

  const handleEditButton = () => {
    const editButton = document.getElementById('imageForm');
    editButton.click();
  };

  const handleLogout = () => {
    props.logoutUser();
  };

  let profileMarkup = !loading ? (
    authenticated ? (
      <Paper className={classes.paper}>
        <div className={classes.profile}>
          <div className="image-wrapper">
            <img className="profile-image" src={imageUrl} alt="avatar" />
            <Tooltip title="Edit Profile Image">
              <EditIcon color="primary" onClick={handleEditButton} />
            </Tooltip>
            <input
              type="file"
              hidden="hidden"
              id="imageForm"
              // ref={editButtonEl}
              onChange={handleUploadUserAvatar}
            />
            <hr />
          </div>

          <div className="profile-details">
            <MuiLink
              component={Link}
              to={`/user/${handle}`}
              variant="h5"
              color="primary"
            >
              @{handle}
            </MuiLink>
            <hr />

            {bio && <Typography variant="body2">{bio}</Typography>}

            {location && (
              <Fragment>
                <LocationOn color="primary" /> <span>{location}</span>
                <hr />
              </Fragment>
            )}

            {website && (
              <Fragment>
                <LinkIcon color="primary" />
                <a href={website} target="_blank" rel="noopener noreferer">
                  {' '}
                  {website}
                </a>
                <hr />
              </Fragment>
            )}

            {createdAt && (
              <Fragment>
                <CalendarToday color="primary" />{' '}
                <span>Joined {dayjs(createdAt).format('MMM YYYY')}</span>
              </Fragment>
            )}

            <div className={classes.buttons}>
              <Tooltip title="Logout">
                <LogoutIcon color="primary" onClick={handleLogout} />
              </Tooltip>

              <EditDetails />
            </div>
          </div>
        </div>
      </Paper>
    ) : (
      <Paper className={classes.paper}>
        <Typography variant="body2" align="center">
          No profile found, please login again.
        </Typography>
        <div className={classes.buttons}>
          <Button
            component={Link}
            to="/login"
            color="primary"
            variant="contained"
          >
            Login
          </Button>

          <Button
            component={Link}
            to="/signup"
            color="secondary"
            variant="contained"
          >
            Signup
          </Button>
        </div>
      </Paper>
    )
  ) : (
    <Typography color="primary" variant="body2">
      Loading...
    </Typography>
  );

  return profileMarkup;
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = {
  uploadUserAvatar,
  logoutUser,
};

Profile.propTypes = {
  user: PropTypes.object.isRequired,
  uploadUserAvatar: PropTypes.func.isRequired,
  logoutUser: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
