import React from 'react';

// MUI
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';

import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

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
    imageUrl,
    // commentCount,
    // likeCount,
    // userImage,
  } = props;

  return (
    <Card className={classes.card}>
      <CardHeader
        // component={Link}
        // to="/home"
        className={classes.cardHeader}
        avatar={<Avatar alt={userHandle} src={imageUrl} />}
        action={<IconButton aria-label="settings"></IconButton>}
        title={userHandle}
        subheader={dayjs(createdAt).fromNow()}
      />

      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {body}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default Scream;
