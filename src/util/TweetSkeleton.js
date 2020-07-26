import React from 'react';
import TweetSkeletonImage from '../images/skeleton_profile.png';
import PropTypes from 'prop-types';
//mui
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';

import withStyles from '@material-ui/core/styles/withStyles';
 const styles = (theme) => ({
    ...theme.spreadIt,
     card: {
         display: 'flex',
         marginBottom: 20,
     },
     cardContent: {
         width: '100%',
         flexDirection:'column',
         padding: 25,
        //  width: '-moz-available',          /* WebKit-based browsers will ignore this. */
        //  width: '-webkit-fill-available',  /* Mozilla-based browsers will ignore this. */
        //  width: 'stretch',

        },
     cover: {
         minWidth: 200,
         objectFit: 'cover'
     },
     handle: {
         width: 60,
         height: 20,
         backgroundColor: theme.palette.primary.main,
         marginBottom: 7 
     },
     date: {
        height: 14,
        width: 100,
        backgroundColor: 'rgba(0,0,0, 0.2)',
        marginBottom: 10
      },
      fullBlock: {
        height: 15,
        width: '90%',
        backgroundColor: 'rgba(0,0,0, 0.4)',
        marginBottom: 10
      },
      halfBlock: {
        height: 15,
        width: '50%',
        backgroundColor: 'rgba(0,0,0, 0.4)',
        marginBottom: 10
      }
 });

 const TweetSkeleton = (props) => {
     const { classes } = props
     const content = Array.from({ length: 5 }).map((item, index) => (
         <Card className={classes.card} key={index}>
             <CardMedia className={classes.cover} image={TweetSkeletonImage}/>
             <CardContent 
             className={classes.cardContent}>
                 <div className={classes.handle}/>
                 <div className={classes.date}/>
                 <div className={classes.fullBlock}/>
                 <div className={classes.fullBlock}/>
                 <div className={classes.halfBlock}/>
             </CardContent>
         </Card>
     ))

     return(
        <div>
        {content}
    </div>
     )
     
 }

 TweetSkeleton.propTypes = {
     classes: PropTypes.object.isRequired
 };

 export default withStyles(styles)(TweetSkeleton);
 