import React from "react";
import { View } from "react-native";
import { ListItem } from "react-native-elements";

export const MessageScreen = () => {
  const list = [
    {
      name: "daido 28歳 大阪",
      avatar_url:
        "https://facebook.github.io/react-native/docs/assets/favicon.png",
      subtitle: "メッセージが届いています"
    },
    {
      name: "shota 30歳 東京",
      avatar_url:
        "https://facebook.github.io/react-native/docs/assets/favicon.png",
      subtitle: "メッセージが届いています"
    }
  ];

  return (
    <View>
      {list.map((l, i) => (
        <ListItem
          key={i}
          leftAvatar={{ source: { uri: l.avatar_url } }}
          title={l.name}
          titleStyle={{ fontSize: 15 }}
          subtitle={l.subtitle}
          subtitleStyle={{ color: "grey", marginTop: 5, fontSize: 12 }}
          bottomDivider
        />
      ))}
    </View>
  );
};
