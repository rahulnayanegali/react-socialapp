import React, { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import NecessaryButtons from '../../util/NecessaryButtons';
import DeleteTweet from './DeleteTweet';
import TweetDialog from './TweetDialog';
import LikeButton from './LikeButton';
// redux
// Icons
import ChatIcon from '@material-ui/icons/Chat';
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
  
    render() {
      const { 
        classes, 
        tweet: { tweetId, tweetHandle, tweetContent, createdAt, userImage, likeCount, commentCount},
        user: {
          authenticated, credentials: { handle }
        }
      } = this.props;
      
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
                  <LikeButton tweetId={tweetId}/>
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
  user: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
  tweet: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  user: state.user,
  data: state.data
})

export default connect(mapStateToProps)(withStyles(styles)(Tweet));
