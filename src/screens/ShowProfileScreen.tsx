import React from "react";
import { View, Text, ScrollView, Dimensions } from "react-native";
import { Avatar, ListItem, Card, Button } from "react-native-elements";

export const ShowProfileScreen = props => {
  const { width } = Dimensions.get("window");
  const params = props.navigation.state.params;
  const user = params.user;

  const handlePress = () => {
    console.log(params.currentUserId);
    console.log(user.id);
  };

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <ScrollView>
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            marginTop: 10
          }}
        >
          <Avatar
            rounded
            size="xlarge"
            source={{
              uri: user.avatarUrl
            }}
          />
        </View>

        <View style={{ marginTop: 25, width: width }}>
          <Card title="基本情報" containerStyle={{ borderRadius: 10 }}>
            <ListItem title={"名前"} rightTitle={user.name}></ListItem>
            <ListItem title={"住所"} rightTitle={user.address}></ListItem>
          </Card>
        </View>
      </ScrollView>
      <View>
        <Button
          title="いいね！"
          style={{ marginBottom: 50 }}
          buttonStyle={{ backgroundColor: "blue" }}
          onPress={handlePress}
        ></Button>
      </View>
    </View>
  );
};
