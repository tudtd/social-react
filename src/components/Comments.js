import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { submitComment } from '../actions/data';

// MUI
import { makeStyles } from '@material-ui/core/styles';

// REDUX
import { connect } from 'react-redux';

const useStyles = makeStyles((theme) => ({
  commentForm: {
    display: 'flex',
    alignItems: 'center',
    margin: '10px',
  },
  userCommentImage: {
    width: 40,
    height: 40,
    borderRadius: '50%',
    margin: '5px 10px',
    border: '1px solid rgba(0,0,0,.2)',
  },
  commentInput: {
    margin: '5px',
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: '30px',
    border: 'none',
    padding: 10,
    width: '100%',
    '&:focus': {
      outline: 'none',
    },
  },
}));

const Comments = (props) => {
  const [comment, setComment] = useState('');
  const { userImage, screamId, comments } = props;

  const classes = useStyles();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('hello from comment submit');
    props.submitComment(screamId, { body: comment });
  };

  return (
    <Fragment>
      <form onSubmit={handleSubmit} className={classes.commentForm}>
        <img src={userImage} alt="" className={classes.userCommentImage} />
        <input
          type="text"
          className={classes.commentInput}
          placeholder="Write a comment..."
          onChange={(e) => setComment(e.target.value)}
        />
      </form>
    </Fragment>
  );
};

Comments.propTypes = {
  submitComment: PropTypes.func.isRequired,
};

export default connect(null, { submitComment })(Comments);
