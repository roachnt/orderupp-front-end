import React, { Component } from "react";
import { connect } from "react-redux";

import firebase from "./firebase";

class Orders extends Component {
  state = {
    orders: []
  };
  componentDidMount() {
    const ordersRef = firebase.database().ref("orders");
    ordersRef.on("value", snapshot => {
      let orders = snapshot.val();
      let newState = [];
      for (let order in orders) {
        newState.push({
          id: order,
          user: orders[order]["user"]
        });
      }
      this.setState({
        orders: newState
      });
    });
  }

  render() {
    return (
      <React.Fragment>
        <h1>Orders</h1>
        <ul>{this.state.orders.map(order => <li>{order.user}</li>)}</ul>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => state;

export default connect(mapStateToProps)(Orders);
