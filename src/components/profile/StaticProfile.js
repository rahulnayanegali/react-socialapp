import React from 'react'
import PropTypes from 'prop-types';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';
import withStyles from '@material-ui/core/styles/withStyles';
//mui
import MuiLink from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
//icons
import LocationOnIcon from '@material-ui/icons/LocationOn';
import LinkIcon from '@material-ui/icons/Link';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';

const styles = (theme) => ({
	...theme.spreadIt
});

const StaticProfile = (props) => {
    const { classes, profile: { handle, createdAt, imageUrl, bio, website, location}} = props;

    return (
        <Paper className={classes.paper}>
            <div className={classes.profile}>
               <div className="image-wrapper">
                  <img src={imageUrl} alt="profile" className="profile-image"/>
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
               
            </div>
         </Paper>
    )
}

StaticProfile.propTypes = {
    profile: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
}
export default withStyles(styles)(StaticProfile);
