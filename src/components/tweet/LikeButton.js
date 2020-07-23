import React, { Component } from 'react'
import NecessaryButtons from '../../util/NecessaryButtons';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
//icons
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
// redux
import { connect } from 'react-redux';
import { likeTweet, dislikeTweet } from '../../redux/actions/dataActions';


export class LikeButton extends Component {
    likedTweet = () => {
        if(this.props.user.likes && this.props.user.likes.find(like => like.tweetId === this.props.tweetId))
          return true;
        else return false;
      };
      likeTweet = () => {
        this.props.likeTweet(this.props.tweetId);
      }
      dislikeTweet = () => {
        this.props.dislikeTweet(this.props.tweetId);
      }
    render() {
        const { authenticated } = this.props.user;
        const LikeButton = !authenticated ? (
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
        return LikeButton;
    }
}

LikeButton.propTypes = {
    likeTweet: PropTypes.func.isRequired,
    dislikeTweet: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    // data: PropTypes.object.isRequired,
    // tweet: PropTypes.object.isRequired,
    // classes: PropTypes.object.isRequired,
    tweetId: PropTypes.string.isRequired,
  }

const mapStateToProps = (state) => ({
    user: state.user,
});
const mapActionsToProps =  {
    likeTweet,
    dislikeTweet,
  }
export default connect(mapStateToProps, mapActionsToProps)(LikeButton);
