import React from "react";
import { Menu, Button, Icon, Grid, Label } from "semantic-ui-react";
import { Link } from "react-router-dom";
import history from "./history";
import { loginUserAction } from "./actions/userActions";
import { connect } from "react-redux";

const MobileNavbar = props => (
  <Grid className="desktop-navbar" style={{ height: "auto" }}>
    <Grid.Row style={{ paddingBottom: 0 }}>
      <Grid.Column style={{ margin: "0 auto", height: "auto" }}>
        <Menu style={{ height: "auto" }} widths={3}>
          <Menu.Item />
          <Menu.Item
            header
            style={{ fontSize: 30, fontFamily: "'Pacifico', cursive" }}
          >
            <Link to="/" style={{ color: "black" }}>
              OrderUpp
            </Link>
          </Menu.Item>
          <Menu.Item />
        </Menu>
      </Grid.Column>
    </Grid.Row>
    <Grid.Row style={{ paddingTop: 0 }}>
      <Grid.Column style={{ margin: "0 auto" }}>
        <Menu style={{ height: "auto" }} widths={3}>
          {props.user ? (
            <React.Fragment>
              <Menu.Item>
                <Button
                  style={{ background: "none" }}
                  onClick={() => history.push("/orders")}
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
          <Menu.Item>
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
          </Menu.Item>
        </Menu>
      </Grid.Column>
    </Grid.Row>
  </Grid>
);

const mapActionsToProps = {
  loginUser: loginUserAction
};
export default connect(state => state, mapActionsToProps)(MobileNavbar);
