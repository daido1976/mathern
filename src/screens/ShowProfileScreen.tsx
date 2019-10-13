import React from "react";
import { View, Text, ScrollView, Dimensions } from "react-native";
import { Avatar, ListItem, Card } from "react-native-elements";

export const ShowProfileScreen = props => {
  const { width } = Dimensions.get("window");
  const params = props.navigation.state.params;

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
              uri: params.avatarUrl
            }}
          />
        </View>

        <View style={{ marginTop: 25, width: width }}>
          <Card title="基本情報" containerStyle={{ borderRadius: 10 }}>
            <ListItem title={"名前"} rightTitle={params.name}></ListItem>
            <ListItem title={"住所"} rightTitle={params.address}></ListItem>
          </Card>
        </View>
      </ScrollView>
    </View>
  );
};
