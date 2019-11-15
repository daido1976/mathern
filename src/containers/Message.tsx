import React, { useState, useEffect } from "react";
import firebase from "firebase";
import "firebase/firestore";
import { MessageScreen } from "../screens/MessageScreen";

export const Message = props => {
  const [users, setUsers] = useState([]);
  const [currentUserId, setCurrentUserId] = useState(null);

  const navigateChat = user => () => {
    props.navigation.navigate("Chat", {
      user: {
        id: user.id,
        avatarUrl: user.avatarUrl,
        name: user.name,
        isLikes: user.isLikes
      },
      currentUserId
    });
  };

  useEffect(() => {
    const unsubscribe = firebase
      .auth()
      .onAuthStateChanged(user => setCurrentUserId(user.uid));

    getMatchUsers();

    return () => unsubscribe();
  }, [currentUserId]);

  const getMatchUsers = async () => {
    if (!currentUserId) {
      return null;
    }

    // TODO: 最後にメッセージした時間でソートする
    const usersSnapshot = await firebase
      .firestore()
      .collection("users")
      .where("matches", "array-contains", currentUserId)
      .get();

    const users = usersSnapshot.docs.map(doc => {
      const isLikes =
        doc.data().likes && doc.data().likes.includes(currentUserId);

      return {
        id: doc.id,
        age: 20,
        name: doc.data().name,
        address: doc.data().address,
        avatarUrl: doc.data().avatarUrl,
        isLikes: isLikes
      };
    });

    setUsers(users);
  };

  return (
    <MessageScreen users={users} navigateChat={navigateChat}></MessageScreen>
  );
};
