import { combineReducers } from "redux";
import user from "./user";
import items from "./items";
import surveys from "./surveys"

export default combineReducers({
  user,
  items,
  surveys
});
