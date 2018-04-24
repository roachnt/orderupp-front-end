import React from "react";
import {
  Message,
  Grid,
  Item,
  Button,
  Portal,
  Segment,
  Header,
  Container
} from "semantic-ui-react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import firebase from "./firebase";
import {
  removeItemFromOrderAction,
  setOrderAction
} from "./actions/orderActions";

// IMPORTANT -- Check for both this.state.items and this.props.order
class Cart extends React.Component {
  state = {
    items: null,
    open: false
  };

  portalTime = null;

  handleOpenPortal = () => {
    if (this.portalTime) clearTimeout(this.portalTime);
    this.setState({ open: true });
    this.portalTime = setTimeout(() => {
      this.setState({ open: false });
    }, 2000);
  };

  componentDidMount() {
    const itemsRef = firebase.database().ref("items");
    itemsRef.on("value", snapshot => {
      let items = snapshot.val();
      let itemsObject = {};
      for (let item in items) {
        itemsObject[item] = {
          category: items[item].category,
          description: items[item].description,
          name: items[item].name,
          price: items[item].price
        };
      }
      this.setState({
        items: itemsObject
      });
    });
  }

  componentWillUnmount() {
    clearTimeout(this.portalTime);
  }

  render() {
    console.log(this.props);
    return (
      <Grid>
        <Grid.Column width={10} style={{ margin: "0 auto" }}>
          {this.props.order && this.props.order.size > 0 ? (
            <Item.Group divided>
              {Object.keys(this.props.order.items).map(itemNumber => (
                <Item key={itemNumber}>
                  {this.state.items ? (
                    <Item.Content>
                      <Item.Header>
                        {
                          this.state.items[
                            this.props.order.items[itemNumber]["itemId"]
                          ]["name"]
                        }
                      </Item.Header>
                      <Item.Meta>
                        <span className="cinema">
                          ${
                            this.state.items[
                              this.props.order.items[itemNumber]["itemId"]
                            ]["price"]
                          }
                        </span>
                      </Item.Meta>
                      <Item.Extra>
                        {Object.values(
                          this.props.order.items[itemNumber].options
                        ).join(", ")}
                      </Item.Extra>

                      <Portal
                        closeOnTriggerClick
                        openOnTriggerClick
                        trigger={
                          <Button
                            color="blue"
                            onClick={() =>
                              this.props.removeItemFromOrder(itemNumber)
                            }
                          >
                            Remove item
                          </Button>
                        }
                        open={this.state.open}
                        onOpen={this.handleOpenPortal}
                      >
                        <Segment
                          color="red"
                          style={{
                            left: 10,
                            position: "fixed",
                            top: 10,
                            zIndex: 1000
                          }}
                        >
                          <Header>Item Removed!</Header>
                        </Segment>
                      </Portal>
                    </Item.Content>
                  ) : (
                    ""
                  )}
                </Item>
              ))}
            </Item.Group>
          ) : (
            <Message style={{ margin: "0 auto" }}>
              <Message.Header>Your cart is empty!</Message.Header>
              <p>
                Click <Link to="/">here</Link> to view the menu and add items
              </p>
            </Message>
          )}
          {this.props.order && this.props.order.size > 0 ? (
            <Container fluid style={{ textAlign: "center" }}>
              <Link to="/checkout" style={{ color: "white" }}>
                <Button style={{ margin: "0 auto" }} color="green">
                  Checkout
                </Button>
              </Link>
            </Container>
          ) : (
            ""
          )}
        </Grid.Column>
      </Grid>
    );
  }
}
const mapStateToProps = state => state;
const mapActionsToProps = {
  removeItemFromOrder: removeItemFromOrderAction,
  setOrder: setOrderAction
};
export default connect(mapStateToProps, mapActionsToProps)(Cart);
