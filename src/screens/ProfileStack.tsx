import React from "react";
import { View } from "react-native";
import { Button } from "react-native-elements";
import { createStackNavigator } from "react-navigation-stack";
import firebase from "firebase";

class ProfileScreen extends React.Component {
  _signOutAsync = async () => {
    await firebase.auth().signOut();
    this.props.navigation.navigate("Auth");
  };

  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Button
          title="Edit Profile"
          onPress={() => this.props.navigation.navigate("EditProfile")}
        />
        <Button
          title="Sign Out"
          style={{ marginTop: 10 }}
          buttonStyle={{ backgroundColor: "red" }}
          onPress={this._signOutAsync}
        ></Button>
      </View>
    );
  }
}

export default createStackNavigator(
  {
    ProfileHome: ProfileScreen
  },
  {
    headerMode: "none"
  }
);
