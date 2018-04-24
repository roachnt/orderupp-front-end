import React from "react";
import { Menu, Button, Icon, Grid, Popup, Label } from "semantic-ui-react";
import { withRouter, Link } from "react-router-dom";

const Navbar = withRouter(props => (
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
                  onClick={() => props.history.push("/cart")}
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
              <Menu.Item onClick={() => props.logout(props.history)}>
                <Button
                  style={{ background: "none" }}
                  onClick={() => props.history.push("/cart")}
                >
                  <Button.Content>
                    <Icon name="list ul" size="huge" />
                  </Button.Content>
                </Button>
              </Menu.Item>
              <Menu.Item onClick={() => props.logout(props.history)}>
                <Button>Logout</Button>
              </Menu.Item>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <Menu.Item onClick={() => props.history.push("/login")}>
                <Button color="red">Login</Button>
              </Menu.Item>
              <Menu.Item onClick={() => props.history.push("/register")}>
                <Button color="red">Sign Up</Button>
              </Menu.Item>
            </React.Fragment>
          )}
        </Menu.Menu>
      </Menu>
    </Grid.Column>
  </Grid>
));

export default Navbar;
