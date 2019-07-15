import React from "react";
import { View, Text } from "react-native";
import { Button } from "native-base";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";
import firebase from "firebase";
import "firebase/storage";

export default class EditProfileScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: null,
      avatar: null,
      uploading: false
    };
  }

  pickImage = async () => {
    let isAccepted = true;

    const permission = await Permissions.getAsync(Permissions.CAMERA_ROLL);

    if (permission.status !== "granted") {
      const newPermission = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (newPermission.status !== "granted") {
        isAccepted = false;
      }
    }

    if (isAccepted) {
      let result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [9, 9]
      });

      if (!result.cancelled) {
        this.setState({ avatar: result.uri });
        console.log(result.uri);
      }
    }
  };

  uploadAvatar = async uri => {
    const storageRef = firebase.storage().ref();
    const userRef = storageRef.child("User");
    const uid = "hogehoge";
    const avatarRef = userRef.child(`${uid}/Avatar/main.png`);

    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = () => {
        resolve(xhr.response);
      };

      xhr.onerror = e => {
        console.log(e);
        reject(new TypeError("Network request failed"));
      };

      xhr.responseType = "blob";
      xhr.open("GET", uri, true);
      xhr.send(null);
    });

    const snapshot = await avatarRef.put(blob);
    blob.close();
    return await snapshot.ref.getDownloadURL();
  };

  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Button
          style={{ marginTop: 10 }}
          full
          rounded
          success
          onPress={this.pickImage}
        >
          <Text style={{ color: "white" }}>Select Image</Text>
        </Button>
        <Button
          style={{ marginTop: 10 }}
          full
          rounded
          warning
          onPress={() => this.uploadAvatar(this.state.avatar)}
        >
          <Text style={{ color: "white" }}>upload</Text>
        </Button>
      </View>
    );
  }
}
