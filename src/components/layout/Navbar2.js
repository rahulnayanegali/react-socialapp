import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import NecessaryButtons from '../../util/NecessaryButtons';
import PostTweet from '../tweet/PostTweet';
import Notifications from './Notifications.js'
// importing Material UI components
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
import MuiSwitch from '@material-ui/core/Switch';
import withStyles from '@material-ui/core/styles/withStyles';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';

// Redux 
import {changedarkMode} from '../../redux/actions/userActions';
import { connect } from 'react-redux';
// Icons
import HomeIcon from '@material-ui/icons/Home';
import Typography from '@material-ui/core/Typography';

const styles = (theme) => ({
	...theme.spreadIt,
	appBar: {
		top: 'auto',
		bottom: 0,
	  },
	  profileAvatar: {
		display: 'flex',
		justifyContent: 'space-around',
		'& > *': {
		//   margin: theme.spacing(1),
		},
	  },
	  postTweet: {
		  right: '25px',
		  bottom: '65px', 
		  position: 'fixed',
	  },
	  [theme.breakpoints.up('md')]: {
		headbar: {
			width: 'fit-content',
			height: '100vh',
			top: 0,
			left:0,
		},
		appBar:{

		}
	  }
});
class Navbar extends Component {
   constructor() {
		super();
		this.state = {
			// dark:false,
			checked:false,
		}
		this.handleChecked = this.handleChecked.bind(this);
   }
   handleChecked = (event) => {
	// event.preventDefault();
	// console.log(this.props.theme.darkMode)
	this.props.changedarkMode();
	   this.setState(state => ({
		   checked:!state.checked
	   }));
   }
	render() {
		const { authenticated, classes } = this.props
		const {
			credentials: { handle, createdAt, imageUrl, bio, website, location }, 
		  } = this.props.user
		return (
			<>
			<Grid container>
				<Grid item xs={12} sm={12} >
				<AppBar color="inherit" className={classes.headbar}>
				<Toolbar>
					<div className={classes.profileAvatar}>
					<Avatar alt="Profile Image" src={imageUrl} />
					</div>
					<Typography variant="h5" component="h2" align="right" style={{marginLeft:'1em'}}>
						Home
					</Typography>
				</Toolbar>
			</AppBar>
				</Grid>
			</Grid>
			 <AppBar className={classes.appBar} color="inherit">
			 	<Toolbar className="nav-container">
					 {authenticated ? 
					 (
						<>
							<div style={{padding: "inherit"}}>
							<Link to="/">
								{/* <NecessaryButtons tip="Home" color="primary">
									<HomeIcon color="default"/>
								</NecessaryButtons> */}																								
								<Fab color="primary" size="medium"  > 
									<HomeIcon />
								</Fab>
							</Link>
							</div>
							<div style={{}}>
							<Fab color="primary" size="medium" >
								<Notifications />
							</Fab>
							</div>
						<div className={classes.postTweet}>
						<PostTweet  />																								
						</div>
						</> 
					 ) : (
						 <>																																																													
						 <Button color="inherit" component={Link} to="/login">Login</Button> 
						 <Button color="inherit" component={Link} to="/">Home</Button> 
						 <Button color="inherit" component={Link} to="/signup">Signup</Button> 
						 <Fab color="default" variant="round" size="medium">
							 <MuiSwitch color="primary" checked={this.state.checked} onChange={this.handleChecked}/>
						</Fab>
						 </>
					 )}
			 	</Toolbar>
			 </AppBar>
			 </>
		)
	}
}

Navbar.propTypes = {
	user: PropTypes.object.isRequired,
	theme: PropTypes.object.isRequired,
	classes: PropTypes.object.isRequired,
	authenticated: PropTypes.bool.isRequired,
	changedarkMode: PropTypes.func.isRequired,
  }
const mapStateToProps = (state) => ({
	theme: state.theme,
	authenticated: state.user.authenticated,
	user: state.user,

  });
const mapActionsToProps = {
	changedarkMode,
}
export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(Navbar));