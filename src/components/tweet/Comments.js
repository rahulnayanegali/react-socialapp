import React, { Component, Fragment } from 'react'
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';

// mui
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
// redux

const styles = theme => ({
    ...theme.spreadIt,
    commentImage: {
        maxWidth: '100%',
        height: 100,
        objectFit: 'cover',
        borderRadius: '50%'
      },
      commentData: {
        marginLeft: 20
      }
})
class Comments extends Component {
    render() {
        const { classes, comments } = this.props;
        return (
            <Grid container>
                {comments.map((comment,index) => {
                    const { content, createdAt, imageUrl, commentBy} = comment;
                    return (
                        <Fragment key={createdAt}>
                            <Grid item sm={12}>
                                <Grid container>
                                    <Grid item sm={2}>
                                        <img
                                        src={imageUrl}
                                        alt="comment"
                                        className={classes.commentImage}
                                        />
                                    </Grid>
                                    <Grid item sm={9}>
                                        <div className={classes.commentData}>
                                        <Typography
                                            variant="h5"
                                            component={Link}
                                            to={`/users/${commentBy}`}
                                            color="primary"
                                        >
                                            {commentBy}
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary">
                                            {dayjs(createdAt).format('h:mm a, MMMM DD YYYY')}
                                        </Typography>
                                        <hr className={classes.invisibleSeparator} />
                                        <Typography variant="body1">{content}</Typography>
                                        </div>
                                    </Grid>
                                </Grid>
                            </Grid>
                            {index !== comments.length -1 && (
                                <hr className={classes.visibleSeperator} />
                            )}
                        </Fragment>
                    );
                    }
                    )
                }
            </Grid>
        )
    }
}

Comments.propTypes = {
    comments: PropTypes.array.isRequired,
    // getTweet: PropTypes.func.isRequired,
    // tweetId: PropTypes.string.isRequired,
    // tweetHandle: PropTypes.string.isRequired, 
    // tweet: PropTypes.object.isRequired,
    // UI: PropTypes.object.isRequired,
}

// const mapStateToProps = state => ({
//     tweet: state.data.tweet,
//     UI: state.UI, 
//     // theme: state.theme,
// });

// const mapActionToProps = {
//     getTweet,
// }

export default withStyles(styles)(Comments);
