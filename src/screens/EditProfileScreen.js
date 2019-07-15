import React from "react";
import { View, Text } from "react-native";
// https://kmagiera.github.io/react-native-gesture-handler/docs/component-touchables.html
import { TouchableOpacity } from "react-native-gesture-handler";
import { Button, Thumbnail } from "native-base";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";
import firebase from "firebase";
import "firebase/storage";

export default class EditProfileScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: null,
      avatar: null,
      uploading: false
    };
    this._getCurrentUserId();
  }

  _getCurrentUserId = async () => {
    await firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({ userId: user.uid });
      } else {
        console.log("No user is signed in");
      }
    });
  };

  // permission を確認して "grented" でなければ、 permission を得てから image pick を始める
  pickImage = async () => {
    // https://docs.expo.io/versions/v33.0.0/sdk/permissions/
    let { status } = await Permissions.getAsync(Permissions.CAMERA_ROLL);

    if (status !== "granted")
      ({ status } = await Permissions.askAsync(Permissions.CAMERA_ROLL));

    if (status === "granted") {
      // https://docs.expo.io/versions/latest/sdk/imagepicker/#imagepickerlaunchimagelibraryasyncoptions
      const result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [4, 3]
      });

      if (!result.cancelled) {
        this.setState({ avatar: result.uri });
        console.log(result.uri);
      }
    }
  };

  uploadAvatar = async uri => {
    const storageRef = firebase.storage().ref();
    const userRef = storageRef.child("Users");
    const avatarRef = userRef.child(`${this.state.userId}/Avatars/main.png`);

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
        <TouchableOpacity onPress={this.pickImage}>
          <Thumbnail
            large
            source={{
              uri: this.state.avatar
                ? this.state.avatar
                : "https://facebook.github.io/react-native/docs/assets/favicon.png"
            }}
          />
        </TouchableOpacity>
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
