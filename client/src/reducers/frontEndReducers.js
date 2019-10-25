import { FALSIFY_BODYCLICKED, TRUE_BODYCLICKED } from "../actions/types";

const BodyClickedReducer = (state = false, action) => {
  switch (action.type) {
    case FALSIFY_BODYCLICKED:
      return action.payload || false;
    case TRUE_BODYCLICKED:
      return action.payload || true;
    default:
      return state;
  }
};

export default BodyClickedReducer;
