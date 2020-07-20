import { SET_TWEETS, LIKE_TWEET, LOADING_DATA, DISLIKE_TWEET, DELETE_TWEET } from '../types';

const initialState = {
    tweets: [],
    tweet: {},
    loading: false,
};

export default function(state = initialState, action){
    switch(action.type){
        case LOADING_DATA:
            return {
                ...state,
                loading: true
            }
        case SET_TWEETS:
            return {
                ...state,
                tweets: action.payload,
                loading: false
            }
        case LIKE_TWEET:
        case DISLIKE_TWEET:
            let index1 = state.tweets.findIndex((tweet) => tweet.tweetId === action.payload.tweetId);
            // console.log(state.tweets[index]);
            state.tweets[index1].likeCount = action.payload.likeCount;

            if(state.tweet.tweetId === action.payload.tweetId) {
                // console.log('Like/Dislike')
                state.tweet = action.payload;
            }
            return {
                ...state,
            }; 
        case DELETE_TWEET:
            let index = state.tweets.findIndex((tweet) => tweet.tweetId === action.payload);
            state.tweets.splice(index, 1);
            return {
                ...state
            }
         default:
            return state;
    }
}