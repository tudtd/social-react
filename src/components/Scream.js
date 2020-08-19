import React from 'react';
import CustomButton from '../util/CustomButton';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import DeleteScream from './DeleteScream';
import Comments from './Comments';

// MUI
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';

// MUI Icons
import LikeButton from '@material-ui/icons/Favorite';
import LikeBorderButton from '@material-ui/icons/FavoriteBorder';
import CommentButton from '@material-ui/icons/Comment';

// REDUX
import { connect } from 'react-redux';
import { likeScream, unlikeScream, deleteScream } from '../actions/data';

dayjs.extend(relativeTime);

const useStyles = makeStyles((theme) => ({
  card: {
    margin: '20px auto',
  },
  cardHeader: {
    color: 'teal',
  },
}));

const Scream = (props) => {
  const classes = useStyles();

  const {
    body,
    userHandle,
    createdAt,
    // imageUrl,
    commentCount,
    likeCount,
    userImage,
    screamId,
    comments,
  } = props;

  const {
    authenticated,
    likes,
    credentials: { handle },
  } = props.user;

  const likedScream = () => {
    if (likes && likes.find((like) => like.screamId === screamId)) return true;
    else return false;
  };

  const handleLike = () => {
    props.likeScream(screamId);
  };

  const handleUnlike = () => {
    props.unlikeScream(screamId);
  };

  const likeButton = !authenticated ? (
    <CustomButton tip="Like">
      <Link to="/login">
        <LikeButton color="primary" />
      </Link>
    </CustomButton>
  ) : likedScream() ? (
    <CustomButton tip="Unlike" onClick={handleUnlike}>
      <LikeButton color="primary" />
    </CustomButton>
  ) : (
    <CustomButton tip="Like" onClick={handleLike}>
      <LikeBorderButton color="primary" />
    </CustomButton>
  );

  const deleteScream =
    authenticated && userHandle === handle ? (
      <DeleteScream screamId={screamId} />
    ) : null;

  return (
    <Card className={classes.card}>
      <CardHeader
        // component={Link}
        // to="/home"
        className={classes.cardHeader}
        avatar={<Avatar alt={userHandle} src={userImage} />}
        action={<IconButton aria-label="settings"></IconButton>}
        title={userHandle}
        subheader={dayjs(createdAt).fromNow()}
      />

      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {body}
        </Typography>
      </CardContent>

      {likeButton}
      <span>{likeCount} likes</span>

      {deleteScream}

      <CustomButton tip="Comments">
        <CommentButton color="primary" />
      </CustomButton>
      <span>{commentCount} comments</span>

      <Comments comments={comments} userImage={userImage} screamId={screamId} />
    </Card>
  );
};

const mapStateToProps = (state) => ({
  user: state.user,
});

const mapDispatchToProps = {
  likeScream,
  unlikeScream,
  deleteScream,
};

Scream.propTypes = {
  likeScream: PropTypes.func.isRequired,
  unlikeScream: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Scream);
