import React from "react";
import { View, Text, Button } from "react-native";
import { createStackNavigator } from "react-navigation";

class HomeScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Profile</Text>
        <Button
          title="Edit Profile"
          onPress={() => this.props.navigation.navigate("EditProfile")}
        />
      </View>
    );
  }
}

class EditProfileScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>ここで編集する</Text>
      </View>
    );
  }
}

export default createStackNavigator({
  Home: { screen: HomeScreen },
  EditProfile: { screen: EditProfileScreen }
});
