import React from "react";
import { Link } from "react-router-dom";
import {
  Button,
  Form,
  Grid,
  Header,
  Message,
  Segment
} from "semantic-ui-react";
import FacebookButton from "./FacebookButton";
import { auth } from "./firebase";
import { loginUserAction } from "./actions/userActions";
import { connect } from "react-redux";
import history from "./history";

class LoginForm extends React.Component {
  render() {
    return (
      <div className="login-form">
        {/*
      Heads up! The styles below are necessary for the correct render of this example.
      You can do same with CSS, the main idea is that all the elements up to the `Grid`
      below must have a height of 100%.
    */}
        <style>{`
        @media (min-width: 768px) {
          body > div,
          body > div > div,
          body > div > div > div.login-form {
            height: 100%;
          }
        }
    `}</style>
        <Grid
          textAlign="center"
          style={{ height: "100%" }}
          verticalAlign="middle"
        >
          <Grid.Column style={{ maxWidth: 450 }}>
            <Header as="h2" color="red" textAlign="center">
              Log-in to your account
            </Header>
            <Form
              size="large"
              onSubmit={e =>
                auth
                  .signInWithEmailAndPassword(
                    e.target.email.value,
                    e.target.password.value
                  )
                  .then(res => {
                    this.props.loginUser(res);
                  })
                  .then(() => history.push("/"))
                  .catch(function(error) {
                    // Handle Errors here.
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    console.log({ errorCode, errorMessage });
                  })
              }
            >
              <Segment stacked>
                <Form.Input
                  fluid
                  icon="user"
                  name="email"
                  iconPosition="left"
                  placeholder="E-mail address"
                />
                <Form.Input
                  fluid
                  icon="lock"
                  name="password"
                  iconPosition="left"
                  placeholder="Password"
                  type="password"
                />

                <Button type="submit" color="red" fluid size="large">
                  Login
                </Button>
              </Segment>
            </Form>
            <br />
            <FacebookButton />
            <Message>
              New to us? <Link to="/register">Sign Up</Link>
            </Message>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

const mapActionsToProps = {
  loginUser: loginUserAction
};

export default connect(state => state, mapActionsToProps)(LoginForm);
