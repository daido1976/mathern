import React from "react";
import { View, Text } from "react-native";
import { Button } from "native-base";
import firebase from "firebase";

export default class DiscoverScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Discover</Text>
        <Button
          style={{ marginTop: 10 }}
          full
          rounded
          danger
          onPress={this._signOutAsync}
        >
          <Text style={{ color: "white" }}>Sign Out</Text>
        </Button>
      </View>
    );
  }

  _signOutAsync = async () => {
    await firebase.auth().signOut();
    this.props.navigation.navigate("Auth");
  };
}
