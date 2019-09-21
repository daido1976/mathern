import React, { useState } from "react";
import { View, TextInput, Button } from "react-native";

export const EditNameScreen = props => {
  const [value, onChangeText] = useState(props.navigation.state.params.name);

  const saveName = () => {
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
