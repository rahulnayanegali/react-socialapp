import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import DeleteTweet from './DeleteTweet';
import NecessaryButtons from '../../util/NecessaryButtons';
import TweetDialog from './TweetDialog';
import LikeButton from './LikeButton';
import ChatIcon from '@material-ui/icons/Chat';
import dayjs from 'dayjs';


const useStyles = makeStyles({
  root: {
    // maxWidth: 345,
    display: 'flex',
    flexDirection: 'column',
    marginBottom: '1em',
    // maxWidth: 'inherit',
  },
  head: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  handle: {
    marginTop: '1em' ,
    textTransform: 'capitalize',
  },

  media: {
    width: 50,
    height: 50,
    marginTop: '1em',
    marginLeft: '1em',
    marginBottom: 0,
    marginRight: '1em',
    borderRadius: 30,

  },
});

 function Tweet(props) {
  const classes = useStyles();
  const { 
    tweet: { tweetId, tweetHandle, tweetContent, createdAt, userImage, likeCount, commentCount},
    user: {
      authenticated, credentials: { handle }
    },
  } = props;
  const deleteButton = authenticated && tweetHandle === handle ? (
    <DeleteTweet tweetId={tweetId} />
  ) : null
  return (
    <Card className={classes.root} >
      {/* <CardActionArea> */}
      <div className={classes.head}>
      <CardMedia
          className={classes.media}
          image={userImage}
          title="User Image"
        />
        <Typography className={classes.handle}   variant="h5" component="h2" >
          {tweetHandle} <Typography variant="overline" >{dayjs(createdAt).format('MMM DD,  YYYY')}</Typography >
          </Typography>
          {deleteButton}
									{/* <Typography variant="body2" color="textSecondary">{createdAt}</Typography> */}
      </div>
        <CardContent style={{paddingBottom:0, paddingTop: 8}}>
          <Typography  variant="body2" color="textSecondary" component="span">
          {tweetContent}
          </Typography>
        </CardContent>
        <CardActions style={{paddingTop:0}}>
        <LikeButton tweetId={tweetId}/>
          <span>{likeCount} Likes</span>
          <NecessaryButtons tip="comments" >
            <ChatIcon color="primary" />
          </NecessaryButtons>
          <span>{commentCount} comments</span>
          <TweetDialog 
            tweetId={tweetId} 
            tweetHandle={tweetHandle} 
            tweetLikeCount={likeCount}
            openDialog={props.openDialog}/>
      </CardActions>
      {/* </CardActionArea> */}
      
    </Card>
  );
}

Tweet.propTypes = {
  user: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
  tweet: PropTypes.object.isRequired,
  // classes: PropTypes.object.isRequired,
  openDialog: PropTypes.object,
}

const mapStateToProps = state => ({
  user: state.user,
  data: state.data
});

export default connect(mapStateToProps)(Tweet);