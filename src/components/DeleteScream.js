import React, { Fragment, useState } from 'react';
import CustomButton from '../util/CustomButton';
import PropTypes from 'prop-types';
import { deleteScream } from '../actions/data';
// MUI
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';

// MUI Icons
import DeleteButton from '@material-ui/icons/DeleteOutline';

// REDUX
import { connect } from 'react-redux';

const useStyle = makeStyles((theme) => ({
  button: {
    float: 'right',
  },
}));

const DeleteScream = (props) => {
  const classes = useStyle();
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDeleteScream = () => {
    props.deleteScream(props.screamId);
    setOpen(false);
  };

  return (
    <Fragment>
      <CustomButton
        tip="Edit Details"
        btnClassName={classes.button}
        onClick={handleClickOpen}
      >
        <DeleteButton color="primary" />
      </CustomButton>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">
          Are you sure delete this scream?
        </DialogTitle>

        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDeleteScream} color="secondary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
};

DeleteScream.propTypes = {
  deleteScream: PropTypes.func.isRequired,
};

export default connect(null, { deleteScream })(DeleteScream);
