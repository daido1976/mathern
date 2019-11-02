import React from "react";
import { View, TouchableOpacity } from "react-native";
import { ListItem } from "react-native-elements";

export const MessageScreen = ({ users, navigateChat }) => {
  return (
    <View>
      {users.map((user, i) => (
        <TouchableOpacity key={i} onPress={navigateChat(user)}>
          <ListItem
            leftAvatar={{ source: { uri: user.avatarUrl } }}
            title={`${user.name} ${user.age}歳 ${user.address}`}
            titleStyle={{ fontSize: 15 }}
            subtitle={"メッセージが届いています"}
            subtitleStyle={{ color: "grey", marginTop: 5, fontSize: 12 }}
            bottomDivider
          />
        </TouchableOpacity>
      ))}
    </View>
  );
};
