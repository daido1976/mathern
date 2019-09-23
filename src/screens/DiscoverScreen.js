import React from "react";
import {
  View,
  Text,
  Dimensions,
  ScrollView,
  TouchableOpacity
} from "react-native";
import { Avatar } from "react-native-elements";

export const DiscoverScreen = () => {
  const { width } = Dimensions.get("window");
  const list = Array.from({ length: 100 }, (_v, i) => i);

  return (
    <ScrollView>
      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap"
        }}
      >
        {list.map(v => (
          <TouchableOpacity key={v}>
            <View
              style={{
                marginVertical: 10,
                width: width * 0.5,
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
              <View style={{ marginTop: 5 }}>
                <Text>30歳 埼玉</Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};
