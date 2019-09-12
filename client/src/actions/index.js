

import axois from 'axios';
import {FETCH_USER, FETCH_SURVEYS, FALSIFY_BODYCLICKED, TRUE_BODYCLICKED} from './types';
//import { type } from './types'


export const fetchUser = () => {
    return async (dispatch) => {
        // here when user calls a actioncreater to simply see if a user is loged in, we have to ask server for this info,
        // so we dont want redux to instatnlty dispactch the action to reducers but instead we ask server and retreive 
        // needded info, then we dispatch the action ourselves to reducers.
        const res = await axois.get('/api/current_user')
        //console.log(res);
        dispatch({ type: FETCH_USER, payload: res.data });
    }
}

export const fetchSurveys = () => {
    return async (dispatch) => {
        // here when user calls a actioncreater to simply see if a user is loged in, we have to ask server for this info,
        // so we dont want redux to instatnlty dispactch the action to reducers but instead we ask server and retreive 
        // needded info, then we dispatch the action ourselves to reducers.
        const res = await axois.get('/api/surveys')
        //console.log(res);
        dispatch({ type: FETCH_SURVEYS, payload: res.data });
    }
}

export const handleStripeToken = (token) => {
    return async (dispatch) => {
        const res = await axois.post('/api/stripe', token)
        // asuming that this route will give us update version of user data.
        dispatch({ type: FETCH_USER, payload: res.data }); // here we just update the store auth. res.data icludes the object send from server
    }
}


export const sendSurvey = (formValues, history) => {
    return async (dispatch) => {
        const res = await axois.post('/api/surveys', formValues)
        // asuming that this route will give us update version of user data.

        history.push('/surveys'); // this redirects us back to the given route.
        dispatch({ type: FETCH_USER, payload: res.data }); // here we just update the store auth. res.data icludes the object send from server
    }
}

export const bodyClickedFalsed = () => {
    console.log("hello falsed 1");
    return async (dispatch) => {
        console.log("hello falsed");
        dispatch({ type: FALSIFY_BODYCLICKED, payload: false}); 
    }
}

export const bodyClickedTrue = () => {
    return async (dispatch) => {
        console.log("hello trued");
        dispatch({ type: TRUE_BODYCLICKED, payload: true}); 
    }
}

 