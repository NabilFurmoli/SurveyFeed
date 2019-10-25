import axois from "axios";
import {
  FETCH_USER,
  FETCH_SURVEYS,
  FALSIFY_BODYCLICKED,
  TRUE_BODYCLICKED
} from "./types";

export const fetchUser = () => {
  return async dispatch => {
    const res = await axois.get("/api/current_user");
    dispatch({ type: FETCH_USER, payload: res.data });
  };
};

export const fetchSurveys = () => {
  return async dispatch => {
    const res = await axois.get("/api/surveys");
    dispatch({ type: FETCH_SURVEYS, payload: res.data });
  };
};

export const handleStripeToken = token => {
  return async dispatch => {
    const res = await axois.post("/api/stripe", token);
    dispatch({ type: FETCH_USER, payload: res.data });
  };
};

export const sendSurvey = (formValues, history) => {
  return async dispatch => {
    const res = await axois.post("/api/surveys", formValues);
    // this redirects us back to the given route.
    history.push("/surveys");
    dispatch({ type: FETCH_USER, payload: res.data });
  };
};

export const bodyClickedFalsed = () => {
  console.log("hello falsed 1");
  return async dispatch => {
    console.log("hello falsed");
    dispatch({ type: FALSIFY_BODYCLICKED, payload: false });
  };
};

export const bodyClickedTrue = () => {
  return async dispatch => {
    console.log("hello trued");
    dispatch({ type: TRUE_BODYCLICKED, payload: true });
  };
};
