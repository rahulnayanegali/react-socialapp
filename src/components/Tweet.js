import React, { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import NecessaryButtons from '../util/NecessaryButtons';
import DeleteTweet from './DeleteTweet';
import TweetDialog from './TweetDialog';
// redux
import { likeTweet, dislikeTweet } from '../redux/actions/dataActions';
// Icons
import ChatIcon from '@material-ui/icons/Chat';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';

// mui imports
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';

const styles = {
		card: {
      position: 'relative',
      display: 'flex',
      marginBottom: 20,
    },
    content: {
      padding: 25,
      objectFit: 'cover'
    },
    image: {
      minWidth: 200,
    }
}

class Tweet extends Component {
  likedTweet = () => {
    if(this.props.user.likes && this.props.user.likes.find(like => like.tweetId === this.props.tweet.tweetId))
      return true;
    else return false;
  };
  likeTweet = () => {
    this.props.likeTweet(this.props.tweet.tweetId);
  }
  dislikeTweet = () => {
    this.props.dislikeTweet(this.props.tweet.tweetId);
  }
    render() {
      const { 
        classes, 
        tweet: { tweetId, tweetHandle, tweetContent, createdAt, userImage, likeCount, commentCount},
        user: {
          authenticated, credentials: { handle }
        }
      } = this.props;
      const likeButton = !authenticated ? (
        <Link to="/login">
          <NecessaryButtons tip="Like">
            <FavoriteBorder color="primary"/>
          </NecessaryButtons>
        </Link>

      ) : (
        this.likedTweet() ? (
          <NecessaryButtons tip="Dislike" onClick={this.dislikeTweet}> 
              {/* {console.log(likeCount)} */}
            <FavoriteIcon color="primary"/>     
          </NecessaryButtons>
        ) : (
          <NecessaryButtons tip="like" onClick={this.likeTweet}> 
              {/* {console.log(likeCount)} */}
            <FavoriteBorder color="primary"/>    
          </NecessaryButtons>
        )
      );
      const deleteButton = authenticated && tweetHandle === handle ? (
        <DeleteTweet tweetId={tweetId} />
      ) : null
        return (
            <div>
							<Card className={classes.card}> 
                <CardMedia 
                className={classes.image}
								image={userImage}
								title="Profile Image" />
								<CardContent className={classes.content}>
                  <Typography 
                  variant="h5" 
                  component={Link} 
                  to={`/users/${tweetHandle}`}
                  color="primary"
                  >{tweetHandle}
                  </Typography>
                  {deleteButton}
									<Typography variant="body2" color="textSecondary">{createdAt}</Typography>
									<Typography variant="body1">{tweetContent}</Typography>
                  {likeButton}
                  <span>{likeCount} Likes</span>
                  <NecessaryButtons tip="comments">
                    <ChatIcon color="primary" />
                  </NecessaryButtons>
                  <span>{commentCount} comments</span>
                  <TweetDialog tweetId={tweetId} tweetHandle={tweetHandle}/>
								</CardContent>
							</Card>
            </div>
        )
    }
}

Tweet.propTypes = {
  likeTweet: PropTypes.func.isRequired,
  dislikeTweet: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
  tweet: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  user: state.user,
  data: state.data
})
const mapActionsToProps =  {
  likeTweet,
  dislikeTweet,
}
export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(Tweet));
