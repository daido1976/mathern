import React from "react";
import firebase from "firebase";
import firebaseConfig from "./src/modules/firebaseConfig";
import AppContainer from "./src/navigation/AppContainer";

firebase.initializeApp(firebaseConfig);

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}
