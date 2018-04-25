import React from "react";
import { Form, Grid } from "semantic-ui-react";
import stateOptions from "./stateOptions";
import axios from "axios";
import { connect } from "react-redux";
import history from "./history";

import { setOrderAction } from "./actions/orderActions";

class Checkout extends React.Component {
  state = {
    value: null
  };

  handleChange = (e, { value }) => this.setState({ value });

  componentDidMount() {
    let formData = {};
    const handler = window.StripeCheckout.configure({
      key: "pk_test_cfwyi1i2UVURudxM3G3lKieh",
      image: "https://stripe.com/img/documentation/checkout/marketplace.png",
      locale: "auto",
      token: function(token) {
        axios
          .post(
            "https://order-system-express-payment-pxvajvegim.now.sh/payment",
            {
              token,
              formData,
              order: this.props.order,
              user: this.props.user,
              createdAt: Date.now()
            }
          )
          .then(function(response) {
            if (response.data.success) {
              console.log(response.data);
              this.props.setOrder({ size: 0, items: {} });
              history.push("/order-success");
            } else history.push("/order-error");
          })
          .catch(function(error) {
            console.log(error);
            history.push("/order-error");
          });
      }
      // TODO: upon response, take to failure or success page
    });
    if (document.querySelector("form"))
      document.querySelector("form").addEventListener("submit", function(e) {
        // Open Checkout with further options:
        e.preventDefault();
        formData.name = e.target.name.value;
        formData.delivery = e.target.delivery.checked;

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
    return (
      <Grid>
        <Grid.Column width={10} style={{ margin: "0 auto" }}>
          <Form>
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
