import React, { Component } from 'react'
import PropTypes from 'prop-types';
import axios from 'axios';
import Tweet from '../components/tweet/Tweet';
import Grid from '@material-ui/core/Grid';
import StaticProfile from '../components/profile/StaticProfile';
import { connect } from 'react-redux';
import { getUserData } from '../redux/actions/dataActions';
import TweetSkeleton from '../util/TweetSkeleton';
import ProfileSkeleton from '../util/ProfileSkeleton';

class user extends Component {
	state =  {
		profile: null,
		tweetIdParam: null,
	}
	componentDidMount() {
		const handle = this.props.match.params.handle;
		const tweetId = this.props.match.params.tweetId;
		if(tweetId) this.setState({ tweetIdParam: tweetId});
		this.props.getUserData(handle);
		axios.get(`/user/${handle}`)
			.then(res => {
				this.setState({
					profile: res.data.user
				});
			})
			.catch(err => alert(err));
	}
    render() {
		 const { tweets, loading } = this.props.data;
		 const { tweetIdParam } = this.state;
		 const tweetsMarkup = loading ? (
			<TweetSkeleton />
		 ) : tweets === null ? (
			 <p> There are no tweets from this user</p>
		 ) : !tweetIdParam ? (
			 tweets.map( tweet => <Tweet key={tweet.tweetId} tweet={tweet}/>)
		 ) : (
			 tweets.map((tweet) => {
				 if(tweet.tweetId !== tweetIdParam)
				 	return <Tweet key={tweet.tweetId} tweet={tweet}/>
				else return <Tweet key={tweet.tweetId} tweet={tweet} openDialog/>
			 })
		 )
        return (
			<Grid container justify="space-evenly">
				<Grid item  xs={12} sm={8} md={5} lg={5}>
					{/* <p>Content</p> */}
					{tweetsMarkup}
				</Grid>
				<Grid item xs={12} sm={10} md={3}>
					{this.state.profile === null ? (
						<ProfileSkeleton />
					): <StaticProfile profile={this.state.profile} />
				}
				</Grid>
			</Grid>
        )
    }
}

user.propTypes = {
	getUserData: PropTypes.func.isRequired,
	data: PropTypes.object.isRequired
 };
 
 const mapStateToProps = (state) => ({
	data: state.data
 }); 

export default connect(mapStateToProps, { getUserData })(user);
