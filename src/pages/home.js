import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid';
import axios from 'axios';	
import Tweet from '../components/Tweet';
import Profile from '../components/Profile';
class home extends Component {
  state = {
    tweets: null,
  }
  componentDidMount() {
    axios.get('./tweets')
      .then(res => {
        this.setState({
          tweets: res.data
        })
      })
      .catch(err => console.log(err));
  }
	render() {
    let redentTweetsMarkup = this.state.tweets ? (
    this.state.tweets.map(tweet => <Tweet tweet={tweet} key={tweet.tweetId}/>)
    ) : (
      <p>Loading...</p>
    )
		return (
			<Grid container spacing={10}>
				<Grid item sm={8} xs={12}>
					{/* <p>Content</p> */}
          <p>{redentTweetsMarkup}</p>
				</Grid>
        <Grid item sm={4} xs={12}>
					<Profile/>
				</Grid>
			</Grid>
		);
	}
}

export default home;