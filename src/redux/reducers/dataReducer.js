import { SET_TWEETS, LIKE_TWEET, LOADING_DATA, DISLIKE_TWEET, DELETE_TWEET, POST_TWEET, SET_TWEET } from '../types';

const initialState = {
    tweets: [],
    tweet: {},
    loading: false,
};

export default function(state = initialState, action){
    let  keysMap = { 
        commentCount: 'commentCount', 
        content: 'tweetContent', 
        createdAt: 'createdAt', 
        handle: 'tweetHandle', 
        imageUrl: 'userImage', 
        likeCount: 'likeCount',
        tweetId: 'tweetId',
    }
    const renameKeys = (keysMap, obj) =>
    Object.keys(obj).reduce(
      (acc, key) => ({
        ...acc,
        ...{ [keysMap[key] || key]: obj[key] }
      }),
      {}
    );
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
        case SET_TWEET:
            let newSetTweetPayload = renameKeys(keysMap, action.payload)
            return {
                ...state,
                tweet: newSetTweetPayload,
            }
        case LIKE_TWEET:
        case DISLIKE_TWEET:
            let newTweetPayload = renameKeys(keysMap, action.payload)
            let index1 = state.tweets.findIndex((tweet) => tweet.tweetId === action.payload.tweetId);
            // console.log(action.payload);
            // state.tweets[index1].likeCount = action.payload.likeCount;
            state.tweets[index1] = newTweetPayload;

            if(state.tweet.tweetId === action.payload.tweetId) {
                // console.log('Like/Dislike')
                state.tweet = newTweetPayload;
            }
            return {
                ...state,
            }; 
        case DELETE_TWEET:
            let index = state.tweets.findIndex((tweet) => tweet.tweetId === action.payload);
            state.tweets.splice(index, 1);
            return {
                ...state
            };
        case POST_TWEET:
            let newPostPayload = renameKeys(keysMap, action.payload)
            return {
                ...state,
                tweets: [
                    newPostPayload,
                    ...state.tweets
                ]
            };

         default:
            return state;
    }
}