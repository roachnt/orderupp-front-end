import React from "react";
import ReactDOM from "react-dom";
import registerServiceWorker from "./registerServiceWorker";
import { createStore } from "redux";
import { Provider } from "react-redux";

import "./index.css";
import Router from "./Router";
import firebase from "./firebase";
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
    items: []
  },
  window.devToolsExtension && window.devToolsExtension()
);

const itemsRef = firebase.database().ref("items");
let newState = [];
itemsRef.on("value", snapshot => {
  let items = snapshot.val();
  for (let item in items) {
    newState.push({
      id: item,
      slug: items[item].slug,
      category: items[item].category,
      description: items[item].description,
      name: items[item].name,
      price: items[item].price
    });
  }
  store.dispatch({ type: "POPULATE_ITEMS", payload: newState });
});

ReactDOM.render(
  <Provider store={store}>
    <Router />
  </Provider>,
  document.getElementById("root")
);
registerServiceWorker();
