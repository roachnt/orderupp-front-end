import React from "react";
import { withRouter } from "react-router-dom";
import { Button } from "semantic-ui-react";
// this also works with react-router-native

const RegisterButton = withRouter(props => (
  <Button
    type="red"
    color="red"
    fluid
    size="large"
    onClick={e => {
      props.registerWithEmail(e, props.history);
    }}
  >
    Sign Up
  </Button>
));

export default RegisterButton;
