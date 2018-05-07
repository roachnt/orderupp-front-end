import React, { Component } from "react";
import { Loader } from "semantic-ui-react";
import { connect } from "react-redux";

import firebase from "./firebase";

class Orders extends Component {
  state = {
    orders: null
  };
  componentDidMount() {
    const ordersRef = firebase
      .database()
      .ref(`users/${this.props.user.uid}/orders`);
    ordersRef.on("value", snapshot => {
      let orders = snapshot.val();
      let newState = [];
      for (let order in orders) {
        newState.push({
          id: order,
          items: orders[order]["items"],
          size: orders[order]["size"]
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
        <h1>Past Orders</h1>
        {this.state.orders ? (
          <ul>
            {this.state.orders.map(order => (
              <li key={order.id}>{JSON.stringify(order)}</li>
            ))}
          </ul>
        ) : (
          <Loader active inline="centered" />
        )}
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => state;

export default connect(mapStateToProps)(Orders);
