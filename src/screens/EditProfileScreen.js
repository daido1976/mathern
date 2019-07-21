import React from "react";
// https://kmagiera.github.io/react-native-gesture-handler/docs/component-touchables.html
import { TouchableOpacity } from "react-native-gesture-handler";
import {
  Thumbnail,
  Container,
  Content,
  List,
  Item,
  ListItem,
  Left,
  Right,
  Label,
  Text,
  Icon,
  Separator,
  Form,
  Picker
} from "native-base";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";
import firebase from "firebase";
import "firebase/firestore";
import "firebase/storage";

export default class EditProfileScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: null,
      avatar: null,
      partSelected: undefined,
      addressSelected: undefined
    };
    this._getCurrentUser();
  }

  _getCurrentUser = async () => {
    await firebase.auth().onAuthStateChanged(user => {
      {
        this.setState({ userId: user.uid });
      }
    });
    const doc = await firebase
      .firestore()
      .collection("users")
      .doc(this.state.userId)
      .get();

    if (doc.exists) {
      console.log("Document data:", doc.data());
      const { avatarUrl } = doc.data();
      this.setState({ avatar: avatarUrl });
    } else {
      console.log("No such document!");
    }
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
        this.updateAvatar();
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

  updateAvatar = async () => {
    try {
      const downloadUrl = await this.uploadAvatar(this.state.avatar);
      await firebase
        .firestore()
        .collection("users")
        .doc(this.state.userId)
        .update({
          avatarUrl: downloadUrl
        })
        .catch(error => alert(error.message));
      console.log("更新に成功しました！");
    } catch (error) {
      console.log(error.toString());
    }
  };

  onAddressValueChange = value => {
    this.setState({
      addressSelected: value
    });
  };

  onPartValueChange = value => {
    this.setState({
      partSelected: value
    });
  };

  render() {
    return (
      <Container>
        <Container
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            marginTop: 10
          }}
        >
          <Content>
            <TouchableOpacity onPress={this.pickImage}>
              <Thumbnail
                style={{
                  height: 180,
                  width: 180,
                  borderRadius: 90
                }}
                source={{
                  uri: this.state.avatar
                    ? this.state.avatar
                    : "https://facebook.github.io/react-native/docs/assets/favicon.png"
                }}
              />
            </TouchableOpacity>
          </Content>
        </Container>
        <Container
          style={{
            flex: 3
          }}
        >
          <Content>
            <Separator bordered>
              <Text>基本情報</Text>
            </Separator>
            <Form>
              <Label style={{ marginTop: 10, marginLeft: 10, fontSize: 11 }}>
                パート
              </Label>
              <Item picker>
                <Picker
                  mode="dropdown"
                  iosIcon={<Icon name="ios-arrow-down" />}
                  style={{ width: 120 }}
                  placeholder="未選択"
                  selectedValue={this.state.partSelected}
                  onValueChange={this.onPartValueChange}
                >
                  <Picker.Item label="ギター" value="key0" />
                  <Picker.Item label="ベース" value="key1" />
                  <Picker.Item label="ドラム" value="key2" />
                  <Picker.Item label="ボーカル" value="key3" />
                  <Picker.Item label="キーボード" value="key4" />
                </Picker>
              </Item>
              <Label style={{ marginTop: 10, marginLeft: 10, fontSize: 11 }}>
                住所
              </Label>
              <Item picker>
                <Picker
                  mode="dropdown"
                  placeholder="未選択"
                  iosIcon={<Icon name="arrow-down" />}
                  style={{ width: 120 }}
                  selectedValue={this.state.addressSelected}
                  onValueChange={this.onAddressValueChange}
                >
                  <Picker.Item label="東京" value="key0" />
                  <Picker.Item label="千葉" value="key1" />
                  <Picker.Item label="神奈川" value="key2" />
                  <Picker.Item label="埼玉" value="key3" />
                </Picker>
              </Item>
            </Form>
          </Content>
        </Container>
      </Container>
    );
  }
}
