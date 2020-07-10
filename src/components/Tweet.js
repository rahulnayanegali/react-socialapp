import React, { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';

// mui imports
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';

const styles = {
		card: {
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
	//tweetId, likeCount, ,  commentCount
    render() {
			const { classes, tweet: { tweetHandle, tweetContent, createdAt, userImage} } = this.props
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
									<Typography variant="body2" color="textSecondary">{createdAt}</Typography>
									<Typography variant="body1">{tweetContent}</Typography>
								</CardContent>
							</Card>
            </div>
        )
    }
}

export default withStyles(styles)(Tweet)
