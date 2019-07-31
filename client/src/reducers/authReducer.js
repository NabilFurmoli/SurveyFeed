

import {FETCH_USER} from '../actions/types';

const authReducer = (state = null, action) => {
    console.log(action);
    switch (action.type) {
        case FETCH_USER:
            return action.payload || false; // returning user data or false. this is assigned to auth in store
        default:
            return state;
    }
}


export default authReducer;