import { FETCH_USER } from "../actions/types";

const authReducer = (state = null, action) => {
  switch (action.type) {
    case FETCH_USER:
      return action.payload || false; // returning user data or false. this is assigned to auth in store
    case "send_survey":
      return action.payload || false;
    default:
      return state;
  }
};

export default authReducer;
