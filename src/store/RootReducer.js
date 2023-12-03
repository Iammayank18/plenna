import { combineReducers } from "redux";
import productReducer from "../redux/reducer";
export const rootReducer = combineReducers({
  productReducer,
});

export const getRootReducer = () => rootReducer;
