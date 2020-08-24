import React, { Component, Fragment } from 'react'
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';
// mui
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import CircularProgress from '@material-ui/core/CircularProgress';
import DialogContent  from '@material-ui/core/DialogContent';

// redux
import { connect } from 'react-redux';
import { postTweet, clearErrors } from '../../redux/actions/dataActions';

const styles = (theme) => ({
   ...theme.spreadIt,
   submitButton: {
      position: 'relative',
      float: 'right',
      margin: 10
   },
   progressSpinner: {
      position: 'absolute',
   },
   closeButton: {
      position: 'absolute',
      left: '91%',
      top: '6%',
	},
	fabButton: {
		position: 'absolute',
		zIndex: 1,
		top: -80,
		left: 200,
		right: 0,
		margin: '0 auto',
	 },
})
class PostTweet extends Component {
    state = {
        open: false,
        content: '',
        errors: {},
    };
    // componentWillReceiveProps(nextProps){
    //    if(nextProps.UI.errors){
    //       this.setState({
    //          errors:nextProps.UI.errors
    //       });
    //    }
    //    if(!nextProps.UI.errors && !nextProps.UI.loading){
    //       this.setState({ 
    //         content: '',
    //         open: false,
    //         errors: {}});
    //      //  this.handleClose(); 
    //    }
    // }

    static getDerivedStateFromProps(nextProps, state){
        if(nextProps.UI.errors){
            this.setState({errors:nextProps.UI.errors});
        }else {
            return null;
        }
        if(!nextProps.UI.errors && !nextProps.UI.loading){
            this.setState({ 
            content: '',
            open: false,
            errors: {}});
            //  this.handleClose(); 
        }else {
            return null;
        }
    }

    handleOpen = () => {
        this.setState({ 
            open: true 
        })
    }
    handleClose = () => {
      this.props.clearErrors();
        this.setState({
            open: false,
            errors: {}
        });
    };
    handleChange = (event) => {
       this.setState({ [event.target.name]: event.target.value})
    }
    handleSubmit = (event) => {
       event.preventDefault();
       this.props.postTweet({content: this.state.content})
       this.props.handleDrawerToggle();
    }
    render() {
       
        const { errors } = this.state;
        const { classes, UI:{loading} } = this.props;
        // const { handleDrawer} = this.props
        return (
            <Fragment>
                {/* <NecessaryButtons tip="Post a Tweet " onClick={this.handleOpen} className={classes.fabButton}>
                    <AddIcon />
                </NecessaryButtons> */}
					 {/* <Fab color="primary" aria-label="add" onClick={this.handleOpen} size="medium"> */}
            {/* <TwitterIcon onClick={this.handleOpen} color="primary" fontSize="large"/> */}
            <Button  onClick={this.handleOpen} variant="contained" color="primary" size='large'>Tweet </Button>
          {/* </Fab> */}
                <Dialog
                open={this.state.open}
                onClose={this.handleClose}
                fullWidth
                maxWidth="xs">
                    {/* <NecessaryButtons tip="Close" onClick={this.handleClose} tipClassName={classes.closeButton}>
                        <CloseIcon /> 
                    </NecessaryButtons> */}
                    < DialogTitle> Post a tweet</DialogTitle>
                    <DialogContent>
                       <form onSubmit={this.handleSubmit}>
                            <TextField
                                name="content"
                                type="text"
                                label="What's happening?"
                                multiline
                                rows="3"
                                placeholder="Please write here"
                                error={errors.content ? true : false}
                                helperText={errors.content}
                                className={classes.textField}
                                onChange={this.handleChange}
                                fullWidth
                            />
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                className={classes.submitButton}
                                disabled={loading}
                            >
                                Submit
                                {loading && (
                                <CircularProgress
                                    size={30}
                                    className={classes.progressSpinner}
                                />
                                )}
                            </Button>
                        </form>
                    </DialogContent>
                </Dialog>
            </Fragment>
        )
    }
}
PostTweet.propTypes = {
    postTweet: PropTypes.func.isRequired,
    UI: PropTypes.object.isRequired,
    clearErrors: PropTypes.func.isRequired,
    theme: PropTypes.object.isRequired,
    // handleDrawer: PropTypes.func.isRequired,
};
 
const mapStateToProps = (state) => ({
    UI: state.UI,
    theme: state.theme,
})
export default connect(mapStateToProps, {postTweet, clearErrors})(withStyles(styles)(PostTweet));
