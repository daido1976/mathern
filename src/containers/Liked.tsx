import React, { useState, useEffect } from "react";
import firebase from "firebase";
import "firebase/firestore";
import { DiscoverScreen } from "../screens/DiscoverScreen";

export const Liked = props => {
  const [users, setUsers] = useState([]);
  const [currentUserId, setCurrentUserId] = useState(null);

  const thanksPress = user => async () => {
    try {
      // 自分の matches に相手の ID を追加
      await firebase
        .firestore()
        .collection("users")
        .doc(currentUserId)
        .update({
          matches: firebase.firestore.FieldValue.arrayUnion(user.id)
        })
        .catch(error => alert(error.message));

      // 相手の matches に自分の ID を追加
      await firebase
        .firestore()
        .collection("users")
        .doc(user.id)
        .update({
          matches: firebase.firestore.FieldValue.arrayUnion(currentUserId)
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
      handlePress: thanksPress,
      profileType: "liked"
    });
  };

  useEffect(() => {
    const unsubscribe = firebase
      .auth()
      .onAuthStateChanged(user => setCurrentUserId(user.uid));
    getLikedUsers();
    return () => unsubscribe();
  }, [currentUserId]);

  const getLikedUsers = async () => {
    if (!currentUserId) {
      return null;
    }

    // TODO: 実装する
    // これも clean up 時に unsubscribe しないといけないので一旦コメントアウトしている
    // firebase
    //   .firestore()
    //   .collection("users")
    //   .onSnapshot(querySnapShot => {
    //     // Snapshot が更新されたらここのコールバックに入ってくる
    //     console.log("onsnapshot!!!", querySnapShot);
    //   });

    const usersSnapshot = await firebase
      .firestore()
      .collection("users")
      .where("likes", "array-contains", currentUserId)
      .get();

    usersSnapshot.forEach(doc => {
      console.log(doc.id, " => ", doc.data());
    });

    const users = usersSnapshot.docs
      .map(doc => {
        return {
          id: doc.id,
          age: 20,
          name: doc.data().name,
          address: doc.data().address,
          avatarUrl: doc.data().avatarUrl,
          matches: doc.data().matches
        };
      })
      // 自分とマッチ済みのユーザは表示しないようにする
      .filter(
        user =>
          !(
            user.id === currentUserId ||
            (user.matches && user.matches.includes(currentUserId))
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
