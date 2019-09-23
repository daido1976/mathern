/* eslint-disable react/prop-types */
import React from "react";
import { View, ActivityIndicator } from "react-native";
import firebase from "firebase";

export default class AuthLoadingScreen extends React.Component {
  constructor(props) {
    super(props);
    this._bootstrapAuth();
  }

  _bootstrapAuth = async () => {
    await firebase.auth().onAuthStateChanged(user => {
      if (user != null) {
        console.log(user.email, "is signed in");
        this.props.navigation.navigate("Home");
      } else {
        console.log("No user is signed in");
        this.props.navigation.navigate("Auth");
      }
    });
  };

  // Render any loading content that you like here
  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }
}
