import React, { useEffect, useState } from "react";
// https://kmagiera.github.io/react-native-gesture-handler/docs/component-touchables.html
import { TouchableOpacity } from "react-native-gesture-handler";
import { View, ScrollView, Text, ActivityIndicator } from "react-native";
import { Avatar, ListItem } from "react-native-elements";
import { SelectPickerListItem } from "../lib/react-natve-elements-extends/SelectPickerListItem";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";
import firebase from "firebase";
import "firebase/firestore";
import "firebase/storage";

const list = [
  {
    title: "住所",
    itemList: [
      { label: "東京", value: "tokyo" },
      { label: "埼玉", value: "saitama" },
      { label: "千葉", value: "chiba" },
      { label: "神奈川", value: "kanagawa" }
    ]
  },
  {
    title: "得意な言語",
    itemList: [
      { label: "JavaScript", value: "js" },
      { label: "Ruby", value: "ruby" },
      { label: "PHP", value: "php" },
      { label: "Go", value: "go" }
    ]
  }
];

export const EditProfileScreen = props => {
  const [userId, setUserID] = useState(null);
  const [avatar, setAvatar] = useState(null);
  const [name, setName] = useState("");

  // TODO: useCurrentUser 的な感じで抽象化したい、返り値は CurrentUser のオブジェクトのイメージ
  useEffect(() => {
    getCurrentUser();
  }, [userId]);

  const getCurrentUser = async () => {
    firebase.auth().onAuthStateChanged(user => setUserID(user.uid));

    if (!userId) {
      return null;
    }

    const doc = await firebase
      .firestore()
      .collection("users")
      .doc(userId)
      .get();

    if (doc.exists) {
      console.log("Document data:", doc.data());
      const { avatarUrl, name } = doc.data();

      setAvatar(avatarUrl);
      setName(name);
    } else {
      console.log("No such document!");
    }
  };

  // permission を確認して "grented" でなければ、 permission を得てから image pick を始める
  const pickImage = async () => {
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
        setAvatar(result.uri);
        console.log(result.uri);
        updateAvatar();
      }
    }
  };

  const uploadAvatar = async uri => {
    const storageRef = firebase.storage().ref();
    const userRef = storageRef.child("Users");
    const avatarRef = userRef.child(`${userId}/Avatars/main.png`);

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

  const updateAvatar = async () => {
    try {
      const downloadUrl = await uploadAvatar(avatar);
      await firebase
        .firestore()
        .collection("users")
        .doc(userId)
        .update({
          avatarUrl: downloadUrl
        })
        .catch(error => alert(error.message));
      console.log("更新に成功しました！");
    } catch (error) {
      console.log(error.toString());
    }
  };

  // FIXME: Loading の表現もっといいやり方あるはず
  if (!name) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View>
      <ScrollView>
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            marginTop: 10
          }}
        >
          <TouchableOpacity onPress={pickImage}>
            <Avatar
              rounded
              size="xlarge"
              showEditButton
              // FIXME: 初期アイコンなんとかする、useState の初期値に突っ込むのもありかも
              source={{
                uri: avatar
                  ? avatar
                  : "https://facebook.github.io/react-native/docs/assets/favicon.png"
              }}
            />
          </TouchableOpacity>
        </View>

        <View style={{ marginTop: 25, backgroundColor: "#C7C7CD" }}>
          <Text style={{ marginVertical: 10 }}>プロフィール</Text>
        </View>
        <View>
          <TouchableOpacity
            onPress={() =>
              props.navigation.navigate("EditName", {
                name,
                userId,
                setProfileName: setName
              })
            }
          >
            <ListItem
              title={"名前"}
              rightTitle={name}
              bottomDivider
              chevron
            ></ListItem>
          </TouchableOpacity>
          {list.map((item, i) => (
            <SelectPickerListItem
              key={i}
              title={item.title}
              itemList={item.itemList}
            />
          ))}
        </View>
      </ScrollView>
    </View>
  );
};
