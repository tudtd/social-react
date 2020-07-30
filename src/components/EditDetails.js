import React, { Fragment, useState, useEffect } from 'react';

// MUI
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

// MUI Icons
import EditIcon from '@material-ui/icons/Edit';

// REDUX
import { connect } from 'react-redux';
import { editUserDetails } from '../actions/user';

const useStyle = makeStyles((theme) => ({}));

const EditDetails = (props) => {
  const classes = useStyle();
  const [open, setOpen] = useState(false);
  const [bio, setBio] = useState('');
  const [location, setLocation] = useState('');
  const [website, setWebsite] = useState('');

  const { credentials } = props.user;

  useEffect(() => {
    mapUserDataToProps(credentials);
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
    mapUserDataToProps(credentials);
  };

  const mapUserDataToProps = (credentials) => {
    setBio(credentials.bio ? credentials.bio : '');
    setLocation(credentials.location ? credentials.location : '');
    setWebsite(credentials.website ? credentials.website : '');
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (e) => {
    const userDetails = {
      bio,
      location,
      website,
    };

    props.editUserDetails(userDetails);
  };

  return (
    <Fragment>
      <EditIcon color="primary" onClick={handleClickOpen} />
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Edit your details</DialogTitle>
        <DialogContent>
          <TextField
            name="bio"
            placeholder="A short bio about yourself"
            autoFocus
            margin="dense"
            id="bio"
            label="Bio"
            type="text"
            onChange={(e) => setBio(e.target.value)}
            value={bio}
            fullWidth
          />
          <TextField
            name="location"
            placeholder="Where you live"
            autoFocus
            margin="dense"
            id="location"
            label="Location"
            type="text"
            onChange={(e) => setLocation(e.target.value)}
            value={location}
            fullWidth
          />
          <TextField
            name="website"
            placeholder="Your personal/professional website"
            autoFocus
            margin="dense"
            id="website"
            label="Website"
            type="text"
            onChange={(e) => setWebsite(e.target.value)}
            value={website}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps, { editUserDetails })(EditDetails);
