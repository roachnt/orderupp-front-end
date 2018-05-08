import { createStore } from "redux";
import rootReducer from "./reducers/rootReducer";

const store = createStore(
  rootReducer,
  {
    user: localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : null,
    order: localStorage.getItem("order")
      ? JSON.parse(localStorage.getItem("order"))
      : { items: {}, size: 0 },
    items: null
  },
  window.devToolsExtension && window.devToolsExtension()
);

export default store;
