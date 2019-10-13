import React, { useState, useEffect } from "react";
import { View, TextInput, Button } from "react-native";
import firebase from "firebase";
import "firebase/firestore";
import { DiscoverScreen } from "../screens/DiscoverScreen";

export const Discover = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getAllUser();
  }, []);

  const getAllUser = async () => {
    const usersSnapshot = await firebase
      .firestore()
      .collection("users")
      .get();

    usersSnapshot.forEach(doc => {
      console.log(doc.id, " => ", doc.data());
    });

    const users = usersSnapshot.docs.map(doc => {
      return {
        userId: doc.id,
        age: 20,
        address: doc.data().address,
        avatarUrl: doc.data().avatarUrl
      };
    });

    setUsers(users);
  };

  return <DiscoverScreen data={users}></DiscoverScreen>;
};
