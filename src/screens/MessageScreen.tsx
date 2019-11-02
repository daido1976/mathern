import React from "react";
import { View } from "react-native";
import { ListItem } from "react-native-elements";

export const MessageScreen = ({ users }) => {
  return (
    <View>
      {users.map((user, i) => (
        <ListItem
          key={i}
          leftAvatar={{ source: { uri: user.avatarUrl } }}
          title={`${user.name} ${user.age}歳 ${user.address}`}
          titleStyle={{ fontSize: 15 }}
          subtitle={"メッセージが届いています"}
          subtitleStyle={{ color: "grey", marginTop: 5, fontSize: 12 }}
          bottomDivider
        />
      ))}
    </View>
  );
};
