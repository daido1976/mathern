import React from "react";
import { View, Text } from "react-native";

export const ShowProfileScreen = props => {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>{props.navigation.state.params.userId}</Text>
    </View>
  );
};
