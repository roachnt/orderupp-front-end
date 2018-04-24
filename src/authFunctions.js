import { auth, facebookProvider } from "./firebase";
import history from "./history";

export const loginWithFacebook = () => {
  auth
    .signInWithPopup(facebookProvider)
    .then(result => {
      this.props.loginUser(result.user);
    })
    .then(() => history.push("/"));
};
export const loginWithEmail = (email, password) =>
  auth
    .signInWithEmailAndPassword(email, password)
    .then(res => {
      this.props.loginUser(res);
    })
    .then(() => history.push("/"))
    .catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log({ errorCode, errorMessage });
    });

export const registerWithEmail = e => {
  e.preventDefault();
  const email = e.target.email.value;
  const password = e.target.password.value;
  auth
    .createUserWithEmailAndPassword(email, password)
    .then(res => this.props.loginUser(res))
    .then(() => history.push("/"))
    .catch(err => {
      const errorCode = err.code;
      const errorMessage = err.message;
      console.log(errorCode);
      console.log(errorMessage);
    });
};

export const logout = () => {
  auth
    .signOut()
    .then(() => {
      this.props.loginUser(null);
    })
    .then(() => history.push("/"));
};
