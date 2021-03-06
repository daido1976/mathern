import React, { useState, useEffect } from "react";
import firebase from "firebase";
import "firebase/firestore";
import { DiscoverScreen } from "../screens/DiscoverScreen";

export const Discover = props => {
  const [users, setUsers] = useState([]);
  const [currentUserId, setCurrentUserId] = useState(null);

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

  const navigateProfileDetail = user => () => {
    props.navigation.navigate("ProfileDetail", {
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
    const unsubscribe = firebase
      .auth()
      .onAuthStateChanged(user => setCurrentUserId(user.uid));

    getDiscoverUsers();

    return () => unsubscribe();
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
          avatarUrl: doc.data().avatarUrl,
          likes: doc.data().likes,
          liked: doc.data().liked
        };
      })
      // 自分と likes, liked 済みのユーザは表示しないようにする
      .filter(
        user =>
          !(
            user.id === currentUserId ||
            (user.likes && user.likes.includes(currentUserId)) ||
            (user.liked && user.liked.includes(currentUserId))
          )
      );

    setUsers(users);
  };

  return (
    <DiscoverScreen
      users={users}
      navigateProfileDetail={navigateProfileDetail}
    ></DiscoverScreen>
  );
};
