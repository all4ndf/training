import countReducer from "./count";
import userReducer from "./user";
import { combineReducers } from "redux";

const allReducers = combineReducers({
  count: countReducer,
  userDetails: userReducer,
});

export default allReducers;
