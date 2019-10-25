import { FETCH_SURVEYS } from "../actions/types";

const surveysReducer = (state = [], action) => {
  switch (action.type) {
    case FETCH_SURVEYS:
      return action.payload || false; // returning user data or false. this is assigned to auth in store
    default:
      return state;
  }
};

export default surveysReducer;
