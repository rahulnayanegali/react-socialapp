import { DARK_MODE } from '../types';

const initialState = {
    darkMode: false,
};

export default function(state = initialState, action) {
    switch(action.type){
        case DARK_MODE: 
            return {
                ...state,
                darkMode: !state.darkMode,
            }
        default:
            return state
        }
    }
