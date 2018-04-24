import React, { Component } from "react";

import firebase, { auth, facebookProvider } from "./firebase";
import { Button } from "semantic-ui-react";
import axios from "axios";

class CheckoutButton extends Component {
  componentDidMount() {
    const handler = window.StripeCheckout.configure({
      key: "pk_test_cfwyi1i2UVURudxM3G3lKieh",
      image: "https://stripe.com/img/documentation/checkout/marketplace.png",
      locale: "auto",
      token: token => axios.post("http://localhost:3000/payment", token)
    });
    if (document.getElementById("customButton"))
      document
        .getElementById("customButton")
        .addEventListener("click", function(e) {
          // Open Checkout with further options:
          e.preventDefault();
          if (this.dataset.subtotal <= 0) return;
          handler.open({
            name: "My Awesome Restaurant",
            description: "Your Order",
            amount: this.dataset.subtotal * 100
          });
        });

    // Close Checkout on page navigation:
    window.addEventListener("popstate", function() {
      handler.close();
    });
  }

  render() {
    return <Button id="customButton">Pay Online</Button>;
  }
}

export default CheckoutButton;
