import firebase from "firebase";

const config = {
  apiKey: "AIzaSyDXxNhTj_8qVJ-ShVIqVPzlvvvQzx1a0iw",
  authDomain: "order-system-5ba54.firebaseapp.com",
  databaseURL: "https://order-system-5ba54.firebaseio.com",
  projectId: "order-system-5ba54",
  storageBucket: "order-system-5ba54.appspot.com",
  messagingSenderId: "265152284331"
};

firebase.initializeApp(config);

export const facebookProvider = new firebase.auth.FacebookAuthProvider();
export const auth = firebase.auth();
export default firebase;
