import React from "react";
import { Menu, Button, Icon, Grid, Popup, Label } from "semantic-ui-react";
import { Link } from "react-router-dom";
import history from "./history";
import { loginUserAction } from "./actions/userActions";
import { connect } from "react-redux";

const Navbar = props => (
  <Grid className="desktop-navbar" style={{ height: "auto" }}>
    <Grid.Column width={13} style={{ margin: "0 auto" }}>
      <Menu style={{ height: "auto" }}>
        <Menu.Item
          header
          style={{ fontSize: 30, fontFamily: "'Pacifico', cursive" }}
        >
          <Link to="/" style={{ color: "black" }}>
            OrderUpp
          </Link>
        </Menu.Item>

        <Menu.Menu position="right">
          <Menu.Item>
            <Popup
              trigger={
                <Button
                  style={{ background: "none" }}
                  onClick={() => history.push("/cart")}
                >
                  <Button.Content>
                    <Icon name="shop" size="huge" />
                    <Label
                      circular
                      size="tiny"
                      color="red"
                      style={{ position: "absolute", top: 10, right: 10 }}
                    >
                      {props.order["size"]}
                    </Label>
                  </Button.Content>
                </Button>
              }
              header={"View Cart"}
              content={"Your subtotal is"}
            />
          </Menu.Item>
          {props.user ? (
            <React.Fragment>
              <Menu.Item onClick={() => history.push("/orders")}>
                <Button
                  style={{ background: "none" }}
                  onClick={() => history.push("/cart")}
                >
                  <Button.Content>
                    <Icon name="list ul" size="huge" />
                  </Button.Content>
                </Button>
              </Menu.Item>
              <Menu.Item onClick={() => props.loginUser(null)}>
                <Button>Logout</Button>
              </Menu.Item>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <Menu.Item onClick={() => history.push("/login")}>
                <Button color="red">Login</Button>
              </Menu.Item>
              <Menu.Item onClick={() => history.push("/register")}>
                <Button color="red">Sign Up</Button>
              </Menu.Item>
            </React.Fragment>
          )}
        </Menu.Menu>
      </Menu>
    </Grid.Column>
  </Grid>
);
const mapActionsToProps = {
  loginUser: loginUserAction
};
export default connect(state => state, mapActionsToProps)(Navbar);
