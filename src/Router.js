import React from "react";
import { Router, Switch, Route } from "react-router-dom";
import Media from "react-media";
import { connect } from "react-redux";

import App from "./App";
import LoginForm from "./Login";
import RegisterForm from "./Register";
import Navbar from "./Navbar";
import Orders from "./Orders";
import Cart from "./Cart";
import Checkout from "./Checkout";
import MobileNavbar from "./MobileNavbar";
import history from "./history";

import { setOrderAction } from "./actions/orderActions";

class RouterComponent extends React.Component {
  render() {
    return (
      <Router history={history}>
        <React.Fragment>
          <Media query="(min-width: 768px)">
            {matches =>
              matches ? (
                <Navbar {...this.props} />
              ) : (
                <MobileNavbar {...this.props} />
              )
            }
          </Media>
          <Switch>
            <Route exact path="/" render={() => <App />} />
            <Route
              exact
              path="/login"
              render={() =>
                this.props.user ? (
                  <div>You're already signed in!</div>
                ) : (
                  <LoginForm {...this.props} />
                )
              }
            />
            <Route
              exact
              path="/register"
              render={() => <RegisterForm {...this.props} />}
            />
            <Route
              exact
              path="/orders"
              render={() =>
                this.props.user ? (
                  <Orders {...this.props} />
                ) : (
                  "Please log in to view your orders."
                )
              }
            />
            <Route exact path="/cart" render={() => <Cart />} />
            <Route
              exact
              path="/checkout"
              render={() => <Checkout {...this.props} />}
            />
          </Switch>
        </React.Fragment>
      </Router>
    );
  }
}

const mapStateToProps = state => state;
const mapActionsToProps = {
  setOrder: setOrderAction
};
export default connect(mapStateToProps, mapActionsToProps)(RouterComponent);
