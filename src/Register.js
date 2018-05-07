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
import { connect } from "react-redux";

import FacebookButton from "./FacebookButton";
import { loginUserAction } from "./actions/userActions";
import { auth } from "./firebase";
import history from "./history";

const RegisterForm = props => (
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
    <Grid textAlign="center" style={{ height: "100%" }} verticalAlign="middle">
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as="h2" color="red" textAlign="center">
          Sign up for an account
        </Header>
        <Form
          size="large"
          onSubmit={e => {
            e.preventDefault();
            const email = e.target.email.value;
            const password = e.target.password.value;
            auth
              .createUserWithEmailAndPassword(email, password)
              .then(res => props.loginUser(res))
              .then(() => history.push("/"))
              .catch(err => {
                const errorCode = err.code;
                const errorMessage = err.message;
                console.log(errorCode);
                console.log(errorMessage);
              });
          }}
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

            <Button type="red" color="red" fluid size="large">
              Sign Up
            </Button>
          </Segment>
        </Form>
        <br />
        <FacebookButton />
        <Message>
          Already have an account? <Link to="/login">Log in</Link>
        </Message>
      </Grid.Column>
    </Grid>
  </div>
);

const mapActionsToProps = {
  loginUser: loginUserAction
};

export default connect(state => state, mapActionsToProps)(RegisterForm);
