import React, { useState, useEffect } from "react";
import firebase from "firebase";
import "firebase/firestore";
import { DiscoverScreen } from "../screens/DiscoverScreen";

export const Liked = props => {
  const [users, setUsers] = useState([]);
  const [currentUserId, setCurrentUserId] = useState();

  const thanksPress = user => async () => {};

  const showProfile = user => () => {
    props.navigation.navigate("ShowProfile", {
      user: {
        id: user.id,
        avatarUrl: user.avatarUrl,
        name: user.name,
        address: user.address
      },
      currentUserId,
      handlePress: thanksPress,
      profileType: "liked"
    });
  };

  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => setCurrentUserId(user.uid));
    getLikedUsers();
  }, [currentUserId]);

  const getLikedUsers = async () => {
    // TODO: 実装する
    firebase
      .firestore()
      .collection("users")
      .onSnapshot(querySnapShot => {
        // Snapshot が更新されたらここのコールバックに入ってくる
        console.log("onsnapshot!!!", querySnapShot);
      });

    if (!currentUserId) {
      return null;
    }

    const usersSnapshot = await firebase
      .firestore()
      .collection("users")
      .where("likes", "array-contains", currentUserId)
      .get();

    usersSnapshot.forEach(doc => {
      console.log(doc.id, " => ", doc.data());
    });

    const users = usersSnapshot.docs.map(doc => {
      return {
        id: doc.id,
        age: 20,
        name: doc.data().name,
        address: doc.data().address,
        avatarUrl: doc.data().avatarUrl
      };
    });

    setUsers(users);
  };

  return (
    <DiscoverScreen data={users} showProfile={showProfile}></DiscoverScreen>
  );
};
