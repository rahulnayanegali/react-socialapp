import React, { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';
// import AppIcon from '../images/titleicon.svg';
import LoginImage from '../images/Twitter_Logo_Blue.svg'
import { Link } from 'react-router-dom';

// Importing material ui
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
// Redux
import { connect } from 'react-redux';
import { loginUser } from '../redux/actions/userActions';

const styles = (theme) => ({
	...theme.spreadIt
});

class login extends Component {
	constructor() {
		super();
		this.state = {
			email: '',
			password: '',
			errors: {},
			buttonDisable: false,
		}
   }

   		static getDerivedStateFromProps(nextProps, state) {
			   if (nextProps.UI.errors) {
				   this.setState({ errors: nextProps.UI.errors })
			   } else {
				return null;
			}
		   }


	handleSubmit = (event) => {
		event.preventDefault();
		const userData = {
			email: this.state.email,
			password: this.state.password,
      };
      this.props.loginUser(userData, this.props.history);
	}

	handleChange = (event) => {
		this.setState({
			[event.target.name]: event.target.value
		})
	}

	render() {
		const { classes,  UI: { loading } } = this.props;
		const { errors } = this.state;

		return (
			<Grid container className={classes.form} spacing={0} style={{justifyContent: 'center'}} >
				{/* <Grid item sm md lg/> */}
				<Grid item xs={12} sm={6} md={4} lg={4}  style={{ maxHeight: '60vh', padding: '30px'}}>
				{/* <Typography variant='h5' className={classes.pageTitle} >
				Log in to Twitter
					</Typography> */}
					<img src={LoginImage} height='30%' width='auto' className={classes.image} alt="LoginIcon" />
					{/* <Typography variant='h5' className={classes.pageTitle} >
						See what’s happening in the world right now
					</Typography> */}
					<Typography variant='h5' className={classes.pageTitle} >
                  Log in to Twitter
					</Typography>
					<form noValidate onSubmit={this.handleSubmit}>
						<TextField 
							id="email" 
							name="email" 
							type="email" 
							label="Email" 
							className={classes.textField}
							helperText={errors.email} 
							error={errors.email ? true: false}
							value={this.state.email} 
							onChange={this.handleChange} 
							fullWidth
						/>

						<TextField 
							id="password" 
							name="password" 
							type="password" 
							label="Password" 
							className={classes.textField}
							helperText={errors.password} 
							error={errors.password ? true: false}
							value={this.state.password} 
							onChange={this.handleChange} 
							fullWidth
						/>

						{errors.general && (
							<Typography variant="body2" className={classes.customError}>
							{errors.general}
							</Typography>
						)}

						<Button 
							type="submit" 
							variant="contained" 
							color= "primary"
							className={classes.button}
							disabled={loading}
						>
							Log in
							{loading && 
								<CircularProgress size={30} className={classes.progress} />
							}
						</Button>
						<br />
						<small>dont have an account? sign up <Link to="/signup">here</Link></small>
					</form>
				</Grid>
			</Grid>
		);
	};
};

login.propTypes = {
   classes: PropTypes.object.isRequired,
   loginUser: PropTypes.func.isRequired,
   user: PropTypes.object.isRequired,
   UI: PropTypes.object.isRequired,
   theme: PropTypes.object.isRequired,
 }

 const mapStateToProps = (state) => ({
   user: state.user,
   UI: state.UI,
   theme: state.theme,
 });
const mapActionsToProps =  {
   loginUser
}


export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(login));