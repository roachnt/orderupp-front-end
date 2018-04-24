import { combineReducers } from "redux";

import userReducer from "./userReducer";
import orderReducer from "./orderReducer";
import itemReducer from "./itemReducer";

const rootReducer = combineReducers({
  user: userReducer,
  order: orderReducer,
  items: itemReducer
});

export default rootReducer;
