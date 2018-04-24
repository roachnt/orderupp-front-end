import React from "react";
import { Button } from "semantic-ui-react";
import { auth, facebookProvider } from "./firebase";
import history from "./history";
import { connect } from "react-redux";
import { loginUserAction } from "./actions/userActions";
// this also works with react-router-native

const FacebookButton = props => (
  <Button
    type="button"
    color="facebook"
    fluid
    size="large"
    onClick={() =>
      auth
        .signInWithPopup(facebookProvider)
        .then(result => {
          props.loginUser(result.user);
        })
        .then(() => history.push("/"))
    }
  >
    Log in with Facebook
  </Button>
);

const mapActionsToProps = {
  loginUser: loginUserAction
};

export default connect(state => state, mapActionsToProps)(FacebookButton);
