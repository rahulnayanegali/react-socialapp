import React from 'react'
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';
import TweetSkeletonImage from '../images/skeleton_profile.png';
//mui
import Paper from '@material-ui/core/Paper';
//Icons
import LocationOnIcon from '@material-ui/icons/LocationOn';
import LinkIcon from '@material-ui/icons/Link';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';

const styles = (theme) => ({
    ...theme.spreadIt,
    handle: {
        height: 20,
        backgroundColor: theme.palette.primary.main,
        width: 60,
        margin: '0 auto 7px auto'
      },
      fullBlock: {
        height: 15,
        backgroundColor: 'rgba(0,0,0, 0.4)',
        width: '100%',
        marginBottom: 10
      },
      iconSkelton: {
        display: '-webkit-inline-box',
        height: 20,
        backgroundColor: theme.palette.primary.main,
        width: '80%',
        margin: '0 auto 7px auto'
      },
      '& span, svg': {
        display: 'block'
      },

});
const ProfileSkeleton = (props) => {
    const { classes  } = props;
    return (
        <Paper className={classes.paper}>
            <div className={classes.profile}>
                <div className="image-wrapper">
                    <img src={TweetSkeletonImage} className="profile-image"/>
                </div>
                <hr /> 
                <div className="profile-details">
                    <div className={classes.handle} />
                    <hr />
                    <div className={classes.fullBlock} />
                    <div className={classes.fullBlock} />
                    <hr />
                    <LocationOnIcon color="primary" />
                    <span className={classes.iconSkelton} />
                    <hr />
                    <LinkIcon color="primary" /> 
                    {/* https://website.com */}
                    <span className={classes.iconSkelton} />
                    <hr />
                    <CalendarTodayIcon color="primary" /> 
                    <span className={classes.iconSkelton} />
                    {/* Joined date */}
                </div>
            </div>
        </Paper>
    )
}

ProfileSkeleton.propTypes = {
    classes: PropTypes.object.isRequired
};


export default withStyles(styles)(ProfileSkeleton);
