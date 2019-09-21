import React, { useState } from "react";
import { View, TextInput, Button } from "react-native";
import firebase from "firebase";
import "firebase/firestore";

export const EditNameScreen = props => {
  const [value, onChangeText] = useState(props.navigation.state.params.name);

  const saveName = async () => {
    try {
      await firebase
        .firestore()
        .collection("users")
        .doc(props.navigation.state.params.userId)
        .update({
          name: value
        })
        .catch(error => alert(error.message));
      console.log("更新に成功しました！");
    } catch (error) {
      console.log(error.toString());
    }
    props.navigation.goBack();
  };

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <TextInput
        style={{ height: 40, borderColor: "gray", borderWidth: 1 }}
        onChangeText={text => onChangeText(text)}
        value={value}
      />
      <Button title="保存する" onPress={saveName} />
    </View>
  );
};
