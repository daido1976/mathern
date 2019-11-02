import React from "react";
import {
  View,
  Text,
  Dimensions,
  ScrollView,
  TouchableOpacity
} from "react-native";
import { Avatar } from "react-native-elements";

// Discover と Liked から呼ばれてるので命名直す
export const DiscoverScreen = ({ users, navigateProfileDetail }) => {
  const { width } = Dimensions.get("window");

  return (
    <ScrollView>
      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap"
        }}
      >
        {users.map((user, i) => (
          <TouchableOpacity key={i} onPress={navigateProfileDetail(user)}>
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
                  uri: user.avatarUrl
                }}
              />
              <View style={{ marginTop: 5 }}>
                <Text>
                  {user.age}歳 {user.address}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};
