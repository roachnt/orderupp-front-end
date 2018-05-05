import React from "react";
import { Form, Grid } from "semantic-ui-react";
import stateOptions from "./stateOptions";
import { connect } from "react-redux";
import history from "./history";
import firebase from "./firebase";

import { setOrderAction } from "./actions/orderActions";

class Checkout extends React.Component {
  state = {
    value: null,
    stateValue: null,
    pay: null
  };

  handler = null;

  handleChange = (e, { value }) => this.setState({ value });
  handleChangeDropdown = (e, { value }) => this.setState({ stateValue: value });
  handleChangePay = (e, { value }) => this.setState({ pay: value });
  handleFormSubmit = e => {
    e.preventDefault();
    let formData = {
      name: e.target.name.value,
      delivery: e.target.delivery.checked,
      address1: e.target.address1.value,
      address2: e.target.address2.value,
      city: e.target.city.value,
      state: this.state.stateValue,
      zip: e.target.zip.value,
      specialinstructions: e.target.specialinstructions.value,
      payOnline: this.state.pay === "online"
    };
    const itemsRef = firebase.database().ref("/items");
    let subtotal;
    itemsRef.on("value", snapshot => {
      let items = snapshot.val();
      subtotal = Object.values(this.props.order.items).reduce(
        (total, item) => total + items[item.itemId].price,
        0
      );
    });

    if (this.state.pay === "online") {
      this.handler = window.StripeCheckout.configure({
        key: "pk_test_cfwyi1i2UVURudxM3G3lKieh",
        image: "https://stripe.com/img/documentation/checkout/marketplace.png",
        locale: "auto",
        token: token => this.sendPayment(token.id, formData)
      });
      this.handler.open({
        name: "My Awesome Restaurant",
        description: "Your Order",
        amount: subtotal * 100
      });
    } else {
      this.sendPayment(null, formData);
    }
  };
  sendPayment = (token, formData) =>
    fetch("https://order-system-express-payment-ywvhgohzqh.now.sh/payment", {
      //fetch("http://localhost:3000/payment", {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        token,
        formData,
        order: this.props.order,
        delivery: this.state.value === "delivery",
        user: this.props.user,
        createdAt: Date.now()
      })
    })
      .then(res => res.json())
      .then(json => {
        if (json.success) {
          this.props.setOrder({ size: 0, items: {} });
          history.push("/order-success");
        } else history.push("/order-error");
      })
      .catch(function(error) {
        console.log(error);
        history.push("/order-error");
      });

  componentDidMount() {
    // Close Checkout on page navigation:
    window.addEventListener("popstate", function() {
      this.handler.close();
    });
  }

  render() {
    return (
      <Grid>
        <Grid.Column width={10} style={{ margin: "0 auto" }}>
          <Form onSubmit={this.handleFormSubmit}>
            <Form.Input fluid label="Name" name="name" />
            <Form.Group inline>
              <Form.Radio
                label="Pickup"
                value="pickup"
                name="pickup"
                checked={this.state.value === "pickup"}
                onChange={this.handleChange}
              />
              <Form.Radio
                label="Delivery"
                value="delivery"
                name="delivery"
                checked={this.state.value === "delivery"}
                onChange={this.handleChange}
              />
            </Form.Group>
            <div
              style={{
                display: this.state.value === "delivery" ? "block" : "none"
              }}
            >
              <Form.Input fluid name="address1" label="Address Line 1" />
              <Form.Input fluid name="address2" label="Address Line 2" />
              <Form.Group inline>
                <Form.Input label="City" placeholder="City" name="city" />
                <Form.Dropdown
                  label="State"
                  placeholder="State"
                  name="state"
                  options={stateOptions}
                  onChange={this.handleChangeDropdown}
                  search
                  selection
                />
                <Form.Input
                  label="Zip Code"
                  name="zip"
                  placeholder="Zip Code"
                  type="number"
                />
              </Form.Group>
            </div>
            <Form.TextArea
              label="Special instructions"
              name="specialinstructions"
              placeholder="If you have any special instructions for you order add them here"
            />
            <Form.Group inline>
              <Form.Radio
                label="Pay Online"
                value="online"
                name="online"
                checked={this.state.pay === "online"}
                onChange={this.handleChangePay}
              />
              <Form.Radio
                label="Pay in Person"
                value="inperson"
                name="inperson"
                checked={this.state.pay === "inperson"}
                onChange={this.handleChangePay}
              />
            </Form.Group>
            <Form.Button>Submit</Form.Button>
          </Form>
        </Grid.Column>
      </Grid>
    );
  }
}

const mapStateToProps = state => state;
const mapActionsToProps = {
  setOrder: setOrderAction
};

export default connect(mapStateToProps, mapActionsToProps)(Checkout);
