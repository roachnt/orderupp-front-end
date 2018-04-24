import React, { Component } from "react";

import firebase from "./firebase";
import OrderMenu from "./OrderMenu";

class App extends Component {
  state = {
    slug: "",
    category: "",
    description: "",
    name: "",
    price: 0,
    items: [],
    user: null
  };

  componentDidMount() {
    const itemsRef = firebase.database().ref("items");
    itemsRef.on("value", snapshot => {
      let items = snapshot.val();
      let newState = [];
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
      this.setState({
        items: newState
      });
    });
  }

  render() {
    return (
      <div className="App">
        <OrderMenu />
      </div>
    );
  }
}

export default App;
