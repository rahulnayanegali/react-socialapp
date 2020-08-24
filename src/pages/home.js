import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid';
import Tweet from '../components/tweet/Tweet';
import Profile from '../components/profile/Profile';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getTweets } from '../redux/actions/dataActions';
import TweetSkeleton from '../util/TweetSkeleton';
import withStyles from '@material-ui/core/styles/withStyles';

const style = theme => ({
  [theme.breakpoints.up('md')]: {
    backgroundColor: 'red',
  }
})

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
			<Grid container justify="space-evenly" >
       {/* <Grid item sm={false} xs={false} md={2}>
         <Navbar />
       </Grid> */}
				<Grid item  xs={12} sm={8} md={5} lg={5}>
        {/* <Grid item xs={12} sm={6} md={4} lg={4} > */}
          {redentTweetsMarkup}
				</Grid>
        <Grid item xs={12} sm={10} md={3}>
					<Profile/>
				</Grid>
			</Grid>
		);
	}
}
home.propTypes = {
  getTweets: PropTypes.func.isRequired,
	classes: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
}
const mapStateToProps = state => ({
  data: state.data,
  user: state.user,
});
export default connect(mapStateToProps, { getTweets })(withStyles(style)(home));