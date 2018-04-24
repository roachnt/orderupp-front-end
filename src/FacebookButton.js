import React from "react";
import { withRouter } from "react-router-dom";
import { Button } from "semantic-ui-react";
// this also works with react-router-native

const FacebookButton = withRouter(props => (
  <Button
    type="button"
    color="facebook"
    fluid
    size="large"
    onClick={() => {
      props.loginWithFacebook(props.history);
    }}
  >
    Log in with Facebook
  </Button>
));

export default FacebookButton;
