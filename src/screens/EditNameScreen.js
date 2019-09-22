import React, { useState } from "react";
import { View, TextInput, Button } from "react-native";
import firebase from "firebase";
import "firebase/firestore";

export const EditNameScreen = props => {
  const [value, onChangeText] = useState(props.navigation.state.params.name);
  const params = props.navigation.state.params;

  const saveName = async () => {
    try {
      await firebase
        .firestore()
        .collection("users")
        .doc(params.userId)
        .update({
          name: value
        })
        .catch(error => alert(error.message));
      console.log("更新に成功しました！");
    } catch (error) {
      console.log(error.toString());
    }
    params.setProfileName(value);
    props.navigation.goBack();
  };

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <TextInput
        style={{ height: 40, width: 100, borderColor: "gray", borderWidth: 1 }}
        onChangeText={text => onChangeText(text)}
        value={value}
        autoCapitalize="none"
      />
      <Button title="保存する" onPress={saveName} />
    </View>
  );
};
