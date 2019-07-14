import React from "react";
import { View, Text, Button } from "react-native";
import { createStackNavigator } from "react-navigation";

class ProfileScreen extends React.Component {
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

export default createStackNavigator(
  {
    ProfileHome: ProfileScreen
  },
  {
    headerMode: "none"
  }
);
