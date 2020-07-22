import { SET_TWEETS, DELETE_TWEET, LOADING_DATA, LIKE_TWEET, DISLIKE_TWEET, LOADING_UI, 
            SET_ERRORS, CLEAR_ERRORS, POST_TWEET, SET_TWEET, STOP_LOADING_UI } from '../types';
import axios from 'axios';

// get tweets
export const getTweets = () => dispatch => {
    dispatch({ type: LOADING_DATA });
    axios.get('/tweets')
        .then(res => {
            dispatch({
                type: SET_TWEETS,
                payload: res.data
            });
        })
        .catch(err => {
            dispatch({
                type: SET_TWEETS,
                payload: [],
            });
        });
}

// Get a tweet
export const getTweet = (tweetId) => (dispatch) => {
    dispatch({ type: LOADING_UI });
    axios.get(`/tweet/${tweetId}`)
        .then(res => {
            dispatch({
                type: SET_TWEET,
                payload: res.data,
            });
            dispatch({
                type: STOP_LOADING_UI,
            });
        })
        .catch(err => console.log(err));
}

// Post a Tweet
export const postTweet = (newTweet) => (dispatch) => {
    dispatch({type: LOADING_UI});
    axios.post('/tweet', newTweet)
        .then(res => {
            dispatch({
                type: POST_TWEET,
                payload: res.data
            });
            dispatch(clearErrors());
        })
        .catch((err) => {
            console.log(err.response)
            dispatch({
                type: SET_ERRORS,
                payload: err.response.data
            });
        });
};

// Like a tweet
export const likeTweet = (tweetId) => dispatch => {
    axios.get(`/tweet/${tweetId}/like`)
        .then(res => {
            dispatch({
                type: LIKE_TWEET,
                payload: {...res.data,tweetId}
            })
        })
        .catch(err => console.log(err));
};

// Dislike tweet
export const dislikeTweet = (tweetId) => dispatch => {
    axios.get(`/tweet/${tweetId}/unlike`)
        .then(res => {
            dispatch({
                type: DISLIKE_TWEET,
                payload: {...res.data,tweetId}
            })
        })
        .catch(err => console.log(err));
};

// Delete Tweet
export const deleteTweet = (tweetId) => (dispatch) => {
    axios.delete(`/tweet/${tweetId}`)
        .then(() => {
            dispatch({
                type: DELETE_TWEET,
                payload: tweetId,
            });
        })
        .catch(err => console.log(err));
}
// clear erros.
export const clearErrors = () => (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
  };