import React, { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';

//mui
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
// redux
import { connect } from 'react-redux';
import { submitComment } from '../../redux/actions/dataActions';

const styles = theme => ({
    ...theme.spreadIt,
})
class CommentForm extends Component {
    state = {
        content: '',
        errors: {}
    }
    componentWillReceiveProps(nextProps){
        if(nextProps.UI.errors){
            this.setState({ errors: nextProps.UI.errors});
        }
        if (!nextProps.UI.errors && !nextProps.UI.loading) {
            this.setState({ content: '' });
          }
    }
    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value});
    }
    handleSubmit = (event) => {
        event.preventDefault();
        this.props.submitComment(this.props.tweetId, { content: this.state.content});
    }
    render() {
        const { classes, authenticated } = this.props;
        const errors = this.state.errors;
        const commentFormMarkup = authenticated ? (
            <Grid item sm={12} style={{ textAlign: 'center'}}>
                <form onSubmit={this.handleSubmit}>
                    <TextField
                        name="content"
                        type="text"
                        label="Comment"
                        error={errors.comment ? true : false}
                        helperText={errors.comment}
                        value={this.state.content}
                        onChange={this.handleChange}
                        fullWidth
                        className={classes.textField}
                        />
                    <Button type="submit"
                        variant="contained"
                        color="primary"
                        className={classes.button}
                        >
                            Submit
                    </Button>
                </form>
                <hr className={classes.visibleSeperator}/>
            </Grid>
        ) : null
        return commentFormMarkup; 
    }
}

CommentForm.propTypes = {
    submitCommit: PropTypes.func.isRequired,
    tweetId: PropTypes.string.isRequired,
    UI: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
    authenticated: PropTypes.bool.isRequired,
}
const mapStateToProps = state => ({
    UI: state.UI,
    authenticated: state.user.authenticated,
});
export default connect(mapStateToProps, {submitComment})(withStyles(styles)(CommentForm));