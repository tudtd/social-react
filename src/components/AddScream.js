import React, { useState, Fragment } from 'react';
import CustomButton from '../util/CustomButton';
import PropTypes from 'prop-types';

// MUI
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';

// MUI Icons
import AddButton from '@material-ui/icons/Add';
import CloseButton from '@material-ui/icons/Close';

// REDUX
import { connect } from 'react-redux';
import { addScream } from '../actions/data';

const useStyles = makeStyles((theme) => ({
  closeButton: {
    position: 'absolute',
    top: '5%',
    left: '90%',
  },
  submitButton: {
    margin: '10px 0',
  },
}));

const AddScream = (props) => {
  const classes = useStyles();

  const [open, setOpen] = useState(false);
  const [screamBody, setScreamBody] = useState('');
  const [errors] = useState({});

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const screamData = {
    body: screamBody,
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    props.addScream(screamData);
    setOpen(false);
  };

  const {
    UI: { loading },
    user: {
      credentials: { handle },
    },
  } = props;

  return (
    <Fragment>
      <CustomButton tip="Add a Scream" onClick={handleClickOpen}>
        <AddButton />
      </CustomButton>

      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle id="form-dialog-title">Create Post</DialogTitle>
        <CustomButton
          tip="Close"
          onClick={handleClose}
          tipClassName={classes.closeButton}
        >
          <CloseButton color="primary" />
        </CustomButton>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <TextField
              autoFocus
              name="body"
              label="New Scream"
              type="text"
              fullWidth
              placeholder={`What's on your mind, ${handle}?`}
              onChange={(e) => setScreamBody(e.target.value)}
              error={errors.body ? true : false}
              helperText={errors.body}
              multiline
              rows="3"
            />

            <Button
              type="submit"
              color="primary"
              variant="contained"
              className={classes.submitButton}
              disable={loading}
            >
              {loading && <CircularProgress size="30" />} Post
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  UI: state.UI,
  user: state.user,
});

AddScream.propTypes = {
  user: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired,
  addScream: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, { addScream })(AddScream);
