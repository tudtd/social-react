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
    width: '80%',
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
        avatar={
          <Avatar
            alt={userHandle}
            src="https://scontent.fsgn5-5.fna.fbcdn.net/v/t1.0-9/36441674_2087936414791185_3335645930501177344_n.jpg?_nc_cat=108&_nc_sid=85a577&_nc_ohc=ISOPAbMecJcAX_uJtev&_nc_ht=scontent.fsgn5-5.fna&oh=05f8cc744c9ea7bb3acd3d47f438562c&oe=5F1F2C6E"
          />
        }
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
