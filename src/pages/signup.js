import React, { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';
import SignUpIcon from '../images/Twitter_Logo_Blue.svg';
import { Link } from 'react-router-dom';

// Importing material ui
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
// Redux
import { connect } from 'react-redux';
import { signupUser } from '../redux/actions/userActions';


const styles = (theme) => ({
	...theme.spreadIt
});

class signup extends Component {
	constructor() {
		super();
		this.state = {
			email: '',
			password: '',
			confirmPassword: '',
			handle: '',
			errors: {},
			buttonDisable: false,
		}
   }
   componentWillReceiveProps(nextProps){
      if (nextProps.UI.errors) {
      this.setState({ errors: nextProps.UI.errors });
      }
   }
	handleSubmit = (event) => {
		event.preventDefault();
		const newuserData = {
			email: this.state.email,
			password: this.state.password,
			confirmPassword: this.state.confirmPassword,
			handle: this.state.handle,
      };
      this.props.signupUser(newuserData, this.props.history);
	};
	handleChange = (event) => {
		this.setState({
			[event.target.name]: event.target.value
		});
	};
	render() {
		const { classes, UI: { loading } } = this.props;
		const { errors } = this.state;
		return (
			<Grid container className={classes.form} spacing={10} style={{justifyContent: 'center'}}>
				{/* <Grid item sm/> */}
				<Grid item xs={10} sm={6} md={4} lg={4}  style={{ maxHeight: '60vh'}}>
					<img src={SignUpIcon} height='100px' width='auto' className={classes.image} alt="LoginIcon" />
					<Typography variant='h4' className={classes.pageTitle}>
						Create your account
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
						<TextField 
							id="confirmPassword" 
							name="confirmPassword" 
							type="confirmPassword" 
							label="Confirm Password" 
							className={classes.textField}
							helperText={errors.confirmPassword} 
							error={errors.confirmPassword ? true: false}
							value={this.state.confirmPassword} 
							onChange={this.handleChange} 
							fullWidth
						/>
						<TextField 
							id="handle" 
							name="handle" 
							type="text" 
							label="Handle" 
							className={classes.textField}
							helperText={errors.handle} 
							error={errors.handle ? true: false}
							value={this.state.handle} 
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
							color="primary" 
							className={classes.button}
							disabled={loading}
						>
							Sign up
							{loading && 
								<CircularProgress size={30} className={classes.progress} />
							}
						</Button>
						<br />
						<small>already have an account ? login <Link to="/login">here</Link></small>
					</form>
				</Grid>
				{/* <Grid item sm/> */}
			</Grid>
		)
	}
}

signup.propTypes = {
   classes: PropTypes.object.isRequired,
   signupUser: PropTypes.func.isRequired,
   user: PropTypes.object.isRequired,
   UI: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
   user: state.user,
   UI: state.UI,
 });
// const mapActionsToProps =  {
//    signupUser
// }

export default connect(mapStateToProps, { signupUser })(withStyles(styles)(signup));