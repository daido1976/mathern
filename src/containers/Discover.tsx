import React, { useState, useEffect } from "react";
import { View, TextInput, Button } from "react-native";
import firebase from "firebase";
import "firebase/firestore";
import { DiscoverScreen } from "../screens/DiscoverScreen";

export const Discover = props => {
  const [users, setUsers] = useState([]);
  const [currentUserId, setCurrentUserId] = useState();

  const likesPress = user => async () => {
    try {
      // 自分の likes に相手の ID を追加
      await firebase
        .firestore()
        .collection("users")
        .doc(currentUserId)
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
          liked: firebase.firestore.FieldValue.arrayUnion(currentUserId)
        })
        .catch(error => alert(error.message));

      console.log("更新に成功しました！");
    } catch (error) {
      console.log(error.toString());
    }
  };

  const showProfile = user => () => {
    props.navigation.navigate("ShowProfile", {
      user: {
        id: user.id,
        avatarUrl: user.avatarUrl,
        name: user.name,
        address: user.address
      },
      currentUserId,
      handlePress: likesPress,
      profileType: "others"
    });
  };

  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => setCurrentUserId(user.uid));
    getDiscoverUsers();
  }, [currentUserId]);

  const getDiscoverUsers = async () => {
    const usersSnapshot = await firebase
      .firestore()
      .collection("users")
      .get();

    usersSnapshot.forEach(doc => {
      console.log(doc.id, " => ", doc.data());
    });

    if (!currentUserId) {
      return null;
    }

    const users = usersSnapshot.docs
      .map(doc => {
        return {
          id: doc.id,
          age: 20,
          name: doc.data().name,
          address: doc.data().address,
          avatarUrl: doc.data().avatarUrl
        };
      })
      .filter(user => user.id !== currentUserId);

    setUsers(users);
  };

  return (
    <DiscoverScreen data={users} showProfile={showProfile}></DiscoverScreen>
  );
};
