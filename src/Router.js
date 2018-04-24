import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Media from "react-media";
import { connect } from "react-redux";

import { auth, facebookProvider } from "./firebase";
import App from "./App";
import LoginForm from "./Login";
import RegisterForm from "./Register";
import Navbar from "./Navbar";
import Orders from "./Orders";
import Cart from "./Cart";
import Checkout from "./Checkout";
import MobileNavbar from "./MobileNavbar";

import { loginUserAction } from "./actions/userActions";
import { setOrderAction } from "./actions/orderActions";

class Router extends React.Component {
  // Authentication functions

  loginWithFacebook = history => {
    auth
      .signInWithPopup(facebookProvider)
      .then(result => {
        this.props.loginUser(result.user);
      })
      .then(() => history.push("/"));
  };
  loginWithEmail = (email, password) =>
    auth
      .signInWithEmailAndPassword(email, password)
      .then(res => {
        this.props.loginUser(res.user);
      })
      .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log({ errorCode, errorMessage });
      });

  registerWithEmail = (e, history) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    auth
      .createUserWithEmailAndPassword(email, password)
      .then(() => history.push("/"))
      .catch(err => {
        const errorCode = err.code;
        const errorMessage = err.message;
        console.log(errorCode);
        console.log(errorMessage);
      });
  };

  logout = history => {
    auth
      .signOut()
      .then(() => {
        this.props.loginUser(null);
      })
      .then(() => history.push("/"));
  };

  setOrderDelivery = delivery => {
    const order = { ...this.state.order };
    order["delivery"] = delivery;
    this.setState({ order });
  };

  componentDidUpdate() {
    if (this.props.order)
      localStorage.setItem(
        "order",
        JSON.stringify({
          ...this.props.order,
          size: parseInt(this.props.order["size"], 10)
        })
      );
  }

  render() {
    return (
      <BrowserRouter>
        <React.Fragment>
          <Media query="(min-width: 768px)">
            {matches =>
              matches ? (
                <Navbar {...this.props} logout={this.logout} />
              ) : (
                <MobileNavbar {...this.props} logout={this.logout} />
              )
            }
          </Media>
          <Switch>
            <Route
              exact
              path="/"
              render={() => <App user={this.props.user} logout={this.logout} />}
            />
            <Route
              exact
              path="/login"
              render={() =>
                this.props.user ? (
                  <div>You're already signed in!</div>
                ) : (
                  <LoginForm
                    {...this.props}
                    loginWithFacebook={this.loginWithFacebook}
                    loginWithEmail={this.loginWithEmail}
                    logout={this.logout}
                  />
                )
              }
            />
            <Route
              exact
              path="/register"
              render={() => (
                <RegisterForm
                  {...this.props}
                  loginWithFacebook={this.loginWithFacebook}
                  logout={this.logout}
                  registerWithEmail={this.registerWithEmail}
                />
              )}
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
            <Route
              exact
              path="/cart"
              render={() => (
                <Cart
                  loginWithFacebook={this.loginWithFacebook}
                  logout={this.logout}
                  registerWithEmail={this.registerWithEmail}
                />
              )}
            />
            <Route
              exact
              path="/checkout"
              render={() => (
                <Checkout
                  {...this.props}
                  order={this.props.order}
                  logout={this.logout}
                />
              )}
            />
          </Switch>
        </React.Fragment>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = state => state;
const mapActionsToProps = {
  loginUser: loginUserAction,
  setOrder: setOrderAction
};
export default connect(mapStateToProps, mapActionsToProps)(Router);
