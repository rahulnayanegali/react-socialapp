import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid';
import Tweet from '../components/tweet/Tweet';
import Profile from '../components/profile/Profile';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getTweets } from '../redux/actions/dataActions';
import TweetSkeleton from '../util/TweetSkeleton';
class home extends Component {
  // state = {
  //   tweets: null,
  // }
  componentDidMount() {
    this.props.getTweets(); 
  }
  componentWillUnmount() {
    this.setState({
      tweets:null
    })
  }
	render() {
    const { tweets, loading } = this.props.data;
    let redentTweetsMarkup = !loading ? (
    tweets.map(tweet => <Tweet tweet={tweet} key={tweet.tweetId} />)
    ) : (
      <TweetSkeleton />
    )
		return (
			<Grid container spacing={10} >
				<Grid item sm={8} xs={12}>
        {/* <Grid item xs={12} sm={6} md={4} lg={4} > */}
        
          {redentTweetsMarkup}
				</Grid>
        <Grid item sm={4} xs={12}>
					<Profile/>
				</Grid>
			</Grid>
		);
	}
}

home.propTypes = {
  getTweets: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
}
const mapStateToProps = state => ({
  data: state.data,
  user: state.user,
});
export default connect(mapStateToProps, { getTweets })(home);