import { combineReducers } from "redux";
import authReducer from "./authReducer";
import suveysReducer from "./surveysReducer";
import BodyClickedReducer from "./frontEndReducers";
import { reducer as reduxFormReducer } from "redux-form";

export default combineReducers({
  auth: authReducer,
  userSurveys: suveysReducer,
  form: reduxFormReducer,
  bodyClicked: BodyClickedReducer
});
