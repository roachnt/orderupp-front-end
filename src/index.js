import React from "react";
import ReactDOM from "react-dom";
import registerServiceWorker from "./registerServiceWorker";
import { Provider } from "react-redux";

import "./index.css";
import Router from "./Router";
import firebase from "./firebase";
import store from "./store";

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
