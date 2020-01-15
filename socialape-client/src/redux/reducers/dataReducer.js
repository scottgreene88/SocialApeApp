import {SET_SCREAM, DELETE_SCREAM, SET_SCREAMS, LOADING_DATA, LIKE_SCREAM, UNLIKE_SCREAM, POST_SCREAM, SUBMIT_COMMENT} from '../types';

const initialState = {
    screams: [],
    scream: {},
    loading: false
}

export default function(state = initialState, action){
    let index = '';
    switch(action.type){
        case LOADING_DATA:
            return {
                ...state,
                loading: true
            }
        case SET_SCREAMS:
            return {
                ...state,
                screams: action.payload,
                loading: false
            }
        case SET_SCREAM:
            return {
                ...state,
                scream: action.payload
            }
        case LIKE_SCREAM:
        case UNLIKE_SCREAM:
            index = state.screams.findIndex((scream) => scream.screamId === action.payload.screamId);
            state.screams[index] = action.payload;
            let comments = state.scream.comments;
            if(state.scream.screamId === action.payload.screamId){
                state.scream = action.payload
                state.scream.comments = comments
            }
            return {
                ...state
            }
        case DELETE_SCREAM:
            index = state.screams.findIndex(scream => scream.screamId === action.payload);
            state.screams.splice(index, 1);
            return {
                ...state
            }
        case POST_SCREAM:
            state.screams.unshift(action.payload);
            return {
                ...state
            }
        case SUBMIT_COMMENT:
            return {
                ...state,
                scream: {
                    ...state.scream,
                    comments: [action.payload, ...state.scream.comments]
                }
            }
        default:
            return state

    }
}

