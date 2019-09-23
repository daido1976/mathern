import React from "react";
import { View, Text, Dimensions } from "react-native";
import { Avatar } from "react-native-elements";

const { width } = Dimensions.get("window");
export default class DiscoverScreen extends React.Component {
  render() {
    return (
      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap"
        }}
      >
        <View
          style={{
            width: width * 0.5,
            backgroundColor: "lightgray",
            alignItems: "center"
          }}
        >
          <Avatar
            rounded
            size="xlarge"
            source={{
              uri:
                "https://facebook.github.io/react-native/docs/assets/favicon.png"
            }}
          />
          <View>
            <Text>30歳 埼玉</Text>
          </View>
        </View>
        <View
          style={{
            width: width * 0.5,
            backgroundColor: "skyblue",
            alignItems: "center"
          }}
        >
          <Avatar
            rounded
            size="xlarge"
            source={{
              uri:
                "https://facebook.github.io/react-native/docs/assets/favicon.png"
            }}
          />
          <View>
            <Text>30歳 埼玉</Text>
          </View>
        </View>
        <View
          style={{
            width: width * 0.5,
            backgroundColor: "skyblue",
            alignItems: "center"
          }}
        >
          <Avatar
            rounded
            size="xlarge"
            source={{
              uri:
                "https://facebook.github.io/react-native/docs/assets/favicon.png"
            }}
          />
          <View>
            <Text>30歳 埼玉</Text>
          </View>
        </View>
      </View>
    );
  }
}
