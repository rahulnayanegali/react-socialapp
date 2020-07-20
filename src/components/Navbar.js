import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import NecessaryButtons from '../util/NecessaryButtons';
// importing Material UI components
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
import MuiSwitch from '@material-ui/core/Switch';
// Redux 
import {changedarkMode} from '../redux/actions/userActions';
import { connect } from 'react-redux';
// Icons
import AddIcon from '@material-ui/icons/Add';
import HomeIcon from '@material-ui/icons/Home';
import Notifications from '@material-ui/icons/Notifications';

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
//    componentDidUpdate(props) {
// 	// props.handleDarkMode();
//    }
	render() {
		const { authenticated } = this.props
		// console.log(this.props.theme.darkMode)
		// color= {this.state.checked ? "secondary" : "primary"}
		return (
			 <AppBar>
			 	<Toolbar className="nav-container">
					 {authenticated ? 
					 (
						<>
						<NecessaryButtons tip="Post a tweet!">
							<AddIcon />
						</NecessaryButtons>
						<Link to="/">
						<NecessaryButtons tip="Home">
							<HomeIcon />
						</NecessaryButtons>
						</Link>
						<NecessaryButtons tip="Notifications">
							<Notifications />
						</NecessaryButtons>
						
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
		)
	}
}

Navbar.propTypes = {
	// classes: PropTypes.object.isRequired,
	theme: PropTypes.object.isRequired,
	authenticated: PropTypes.bool.isRequired,
	changedarkMode: PropTypes.func.isRequired,
  }
const mapStateToProps = (state) => ({
	theme: state.theme,
	authenticated: state.user.authenticated,
  });
const mapActionsToProps = {
	changedarkMode,
}
export default connect(mapStateToProps, mapActionsToProps)(Navbar);