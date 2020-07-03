import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid';
import axios from 'axios';	
import Tweet from '../components/Tweet';
class home extends Component {
  state = {
    tweets: null,
  }
  componentDidMount() {
    axios.get('./tweets')
      .then(res => {
        console.log(res.data)
        this.setState({
          tweets: res.data
        })
      })
      .catch(err => console.log(err));
  }
	render() {
    let redentScreamsMarkup = this.state.tweets ? (
    this.state.tweets.map(tweet => <Tweet tweet={tweet}/>)
    ) : (
      <p>Loading...</p>
    )
		return (
			<Grid container spacing={16}>
				<Grid item sm={8} xs={12}>
					{/* <p>Content</p> */}
          <p>{redentScreamsMarkup}</p>
				</Grid>
        <Grid item sm={4} xs={12}>
					<p>Profile</p>
				</Grid>
			</Grid>
		);
	}
}

export default home;