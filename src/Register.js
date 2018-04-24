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
import { loginWithFacebook, registerWithEmail } from "./authFunctions";
import FacebookButton from "./FacebookButton";

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
        <Form size="large" onSubmit={e => registerWithEmail(e)}>
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
        <FacebookButton loginWithFacebook={loginWithFacebook} />
        <Message>
          Already have an account? <Link to="/login">Log in</Link>
        </Message>
      </Grid.Column>
    </Grid>
  </div>
);

export default RegisterForm;