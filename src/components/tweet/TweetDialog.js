import React, { Component, Fragment } from 'react'
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';
import NecessaryButtons from '../../util/NecessaryButtons';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';
import LikeButton from './LikeButton';
import Comments from './Comments';
//mui
import Dialog from '@material-ui/core/Dialog';
import CircularProgress from '@material-ui/core/CircularProgress';
import DialogContent  from '@material-ui/core/DialogContent';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
// Icons
import CloseIcon from '@material-ui/icons/Close';
import ChatIcon from '@material-ui/icons/Chat';
import Unfoldmore from '@material-ui/icons/UnfoldMore';
// redux
import { connect } from 'react-redux';
import { getTweet } from '../../redux/actions/dataActions';

const styles = theme => ({
    ...theme.spreadIt,
    
    tweetDialogContent: {
        // maxWidth: '90%',
        padding: 20,
    },
    profileImage: {
        maxWidth: 200,
        height: 200,
        borderRadius: '50%',
        objectFit: 'cover' 
      },
    closeButton: {
        position: 'absolute',
        left: "90%",
        
    },
    expandButton: {
        position: 'absolute',
        left: '90% ',
    },
    spinnerDiv: {
        textAlign: 'center',
        marginTop: 50,
        marginBottom: 50
    }

})
class TweetDialog extends Component {
    state = {
        open: false,
    }
    handleOpen = () => {
        this.setState({ open: true});
        this.props.getTweet(this.props.tweetId);
    }
    handleClose = () => {
        this.setState({ open: false });
    }
    render() {
        const { classes, tweet: { tweetId,
            tweetContent,
            createdAt,
            likeCount,
            commentCount,
            userImage,
            tweetHandle,
            comments},
            UI: { loading }
        } = this.props
        
        const dialogMarkup = loading ? (
            <div className={classes.spinnerDiv}>
                <CircularProgress size={100}  />
            </div>
            
        ) : ( 
            <Grid container spacing={0} >
                <Grid item sm={5}>
                    <img src={userImage} alt="Profile" className={classes.profileImage} />
                </Grid>
                <Grid item sm={7} > 
                   <Typography
                        component={Link}
                        color="primary"
                        variant="h5"
                        to={`/users/${tweetHandle}`}
                        >
                            @{tweetHandle}
                        </Typography>
                        <hr className={classes.invisibleSeperator} />
                        <Typography variant="body2" color="textSecondary">
                            {dayjs(createdAt).format('h:mm a, MMMM DD YYYY')}
                        </Typography>
                        <hr className={classes.invisibleSeparator} />
                        <Typography variant="body1">{tweetContent}</Typography>
                        <hr className={classes.invisibleSeparator} />
								<LikeButton tweetId={tweetId}/>
								<span>{likeCount} Likes</span>
								<NecessaryButtons tip="comments">
                    <ChatIcon color="primary" />
                  </NecessaryButtons>
                  <span>{commentCount} comments</span>
                </Grid>
                <hr className={classes.visibleSeparator} />
                <Comments comments={comments}/>
            </Grid>
        )
        return (
            <Fragment>
                <NecessaryButtons onClick={this.handleOpen} tip="expand tweet" tipClassName={classes.expandButton}>
                    <Unfoldmore color="primary" />
                </NecessaryButtons>
                <Dialog
                open={this.state.open}
                onClose={this.handleClose}
                fullWidth
                maxWidth="sm">
                    <NecessaryButtons tip="Close" onClick={this.handleClose} tipClassName={classes.closeButton}>
                        <CloseIcon /> 
                    </NecessaryButtons>
                <DialogContent className={classes.tweetDialogContent}>
                    {dialogMarkup}
                </DialogContent>
                </Dialog>
            </Fragment>
        )
    }
}

TweetDialog.propTypes = {
    getTweet: PropTypes.func.isRequired,
    tweetId: PropTypes.string.isRequired,
    tweetHandle: PropTypes.string.isRequired, 
    tweet: PropTypes.object.isRequired,
    UI: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    tweet: state.data.tweet,
    UI: state.UI, 
    theme: state.theme,
});

const mapActionToProps = {
    getTweet,
}
export default connect(mapStateToProps, mapActionToProps)(withStyles(styles)(TweetDialog));