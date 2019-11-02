import React, { useState, useEffect } from "react";
import firebase from "firebase";
import "firebase/firestore";
import { MessageScreen } from "../screens/MessageScreen";

export const Message = props => {
  const [users, setUsers] = useState([]);
  const [currentUserId, setCurrentUserId] = useState();

  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => setCurrentUserId(user.uid));
    getMatchUsers();
  }, [currentUserId]);

  const getMatchUsers = async () => {
    if (!currentUserId) {
      return null;
    }

    const usersSnapshot = await firebase
      .firestore()
      .collection("users")
      .where("matches", "array-contains", currentUserId)
      .get();

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

    setUsers(users);
  };

  return <MessageScreen users={users}></MessageScreen>;
};
