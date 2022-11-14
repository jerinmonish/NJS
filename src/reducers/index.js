import { combineReducers } from "redux";
import productsApi from "./productsApi";
import categoryApi from "./categoryApi";
import variableChanges from "./variableChanges";
import userApi from "./userApi";
export default combineReducers({
  variableChanges,
  productsApi,
  categoryApi,
  userApi,
});