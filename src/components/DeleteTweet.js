import React, { Component, Fragment } from 'react'
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';
import NecessaryButtons from '../util/NecessaryButtons';

// mui
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DeleteOutline from '@material-ui/icons/DeleteOutline';

// redux
import { connect } from 'react-redux';
import { deleteTweet } from '../redux/actions/dataActions';

const styles = {
   deleteButton:{ 
   position: 'absolute',
   left: '90%',
   top: '10%',
}
};
class DeleteTweet extends Component {
    state = {
        open: false 
    };
    handleOpen = () => {
        this.setState({ open: true });
    }
    handleClose = () => {
        this.setState({ open: false });
    }
    deleteTweet = () => {
        this.props.deleteTweet(this.props.tweetId);
        this.setState({ open: false });
    }
    render() {
       const { classes } = this.props;  
        return (
            <Fragment>
                <NecessaryButtons 
                tip="Delete Tweet"
                onClick={this.handleOpen}
                btnClassName={classes.deleteButton}
                >
                    <DeleteOutline color="secondary" />
                </NecessaryButtons>
                    <Dialog
                        open={this.state.open}
                        onClose={this.handleClose}
                        fullWidth
                        maxWidth="sm"
                        >
                            <DialogTitle>
                                Are you sure you want to delete this scream ?
                            </DialogTitle>
                            <DialogActions>
                              <Button onClick={this.handleClose}>
                                 Cancel
                              </Button>
                              <Button onClick={this.deleteTweet}>
                                 Delete
                              </Button>
                            </DialogActions>
                        </Dialog>
            </Fragment>
        );
    }
}

DeleteTweet.propTypes = {
    deleteTweet: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired,
    tweetId: PropTypes.string.isRequired,
}
export default connect (null, { deleteTweet })(withStyles(styles)(DeleteTweet));
