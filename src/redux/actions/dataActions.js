import { SET_TWEETS, DELETE_TWEET, LOADING_DATA, LIKE_TWEET, DISLIKE_TWEET } from '../types';
import axios from 'axios';

// get tweets
export const getTweets = () => dispatch => {
    dispatch({ type: LOADING_DATA });
    axios.get('/tweets')
        .then(res => {
            dispatch({
                type: SET_TWEETS,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch({
                type: SET_TWEETS,
                payload: [],
            })
        })
}

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