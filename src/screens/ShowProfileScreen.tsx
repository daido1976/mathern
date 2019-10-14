import React from "react";
import { View, Text, ScrollView, Dimensions } from "react-native";
import { Avatar, ListItem, Card, Button } from "react-native-elements";
import firebase from "firebase";
import "firebase/firestore";

export const ShowProfileScreen = props => {
  const { width } = Dimensions.get("window");
  const params = props.navigation.state.params;
  const user = params.user;

  // FIXME: Container にリフトアップする
  const handlePress = async () => {
    try {
      // 自分の likes に相手の ID を追加
      await firebase
        .firestore()
        .collection("users")
        .doc(params.currentUserId)
        .update({
          likes: firebase.firestore.FieldValue.arrayUnion(user.id)
        })
        .catch(error => alert(error.message));

      // 相手の liked に自分の ID を追加
      await firebase
        .firestore()
        .collection("users")
        .doc(user.id)
        .update({
          liked: firebase.firestore.FieldValue.arrayUnion(params.currentUserId)
        })
        .catch(error => alert(error.message));

      console.log("更新に成功しました！");
    } catch (error) {
      console.log(error.toString());
    }
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
        {(() => {
          switch (params.profileType) {
            case "liked": {
              return (
                <Button
                  title="ありがとう！"
                  style={{ marginBottom: 50 }}
                  buttonStyle={{ backgroundColor: "green" }}
                  onPress={handlePress}
                ></Button>
              );
            }
            default: {
              return (
                <Button
                  title="いいね！"
                  style={{ marginBottom: 50 }}
                  buttonStyle={{ backgroundColor: "blue" }}
                  onPress={handlePress}
                ></Button>
              );
            }
          }
        })()}
      </View>
    </View>
  );
};
