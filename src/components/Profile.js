import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import EditDetails from './EditDetails';
import NecessaryButtons from '../util/NecessaryButtons';
// Redux
import { connect } from 'react-redux';
import {logoutUser, uploadImage} from '../redux/actions/userActions';
// Material UI
import withStyles from '@material-ui/core/styles/withStyles';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import MuiLink from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';

//Icons
import LocationOnIcon from '@material-ui/icons/LocationOn';
import LinkIcon from '@material-ui/icons/Link';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import EditIcon from '@material-ui/icons/Edit';
import KeyboardReturn from '@material-ui/icons/KeyboardReturn';

const styles = (theme) => ({
	...theme.spreadIt
});

class Profile extends Component {
   handleImageChange = (event) => {
      const image = event.target.files[0];
      // send to server
      const formData = new FormData();
      formData.append('image', image, image.name);
      this.props.uploadImage(formData);
   }
   handleEditPicture = () => {
      const fileInput = document.getElementById('imageUnput');
      fileInput.click();   
   }
   handleLogout = () => {
      this.props.logoutUser();
   }
    render() {
      const { classes, 
              user: {
                credentials: { handle, createdAt, imageUrl, bio, website, location }, 
                loading,
                authenticated,
              }
              } = this.props;
      
      let profileMarkup = !loading ? (authenticated ? (
         <Paper className={classes.paper}>
            <div className={classes.profile}>
               <div className="image-wrapper">
                  <img src={imageUrl} alt="profile" className="profile-image"/>
                  <input type="file" id="imageUnput" hidden="hidden" onChange={this.handleImageChange}/>
                  <NecessaryButtons tip="Edit profle image" onClick={this.handleEditPicture} btnClassName="button">
                     <EditIcon color="primary"/>
                  </NecessaryButtons>
               </div>
               <hr/>
               <div className="profile-details">
               <MuiLink component={Link} to={`/users/${handle}`} color="primary" variant="h5">
                  @{handle}
               </MuiLink>
               <hr/>
               {bio && <Typography variant="body2">{bio}</Typography>}
               <hr/>
               {location && (
                  <>
                     <LocationOnIcon color="primary"/>
                     <span>{location}</span>
                     <hr/>
                  </>)}
               {website && (
                  <>
                     <LinkIcon color="primary"/>
                     <a href={website} target="_blank" rel="noopener noreferrer">
                        {' '}{website}
                     </a>
                     <hr/>
                  </>)}
               <CalendarTodayIcon color="primary"/>
               <span>Joined {dayjs(createdAt).format('MMM YYYY')}</span>
               {/* <hr/> */}
               </div>
               <NecessaryButtons tip="Logout" onClick={this.handleLogout} >
                  <KeyboardReturn color="primary" />
                  </NecessaryButtons>
               <EditDetails />
            </div>
         </Paper>
      ) : (
         <Paper className={classes.paper}>
            <Typography variant="body2" align="center">
               No profile found, please login
            </Typography>
            <div className={classes.buttons}>
               <Button variant="contained" color="primary" component={Link} to="/login">
                  Login
               </Button>
               <Button variant="contained" color="primary" component={Link} to="/signup">
                  Signup
               </Button>
            </div>
         </Paper>
      )) : (<p>Loading...</p>)
        return profileMarkup;
    }
}

const mapStateToProps = (state) => ({
  user: state.user,
} );

const mapActionsToProps = {
   uploadImage,
   logoutUser,
}
Profile.propTypes = {
  classes: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  uploadImage: PropTypes.func.isRequired,
  logoutUser: PropTypes.func.isRequired,
}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(Profile));
