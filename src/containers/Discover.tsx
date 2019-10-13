import React, { useState, useEffect } from "react";
import { View, TextInput, Button } from "react-native";
import firebase from "firebase";
import "firebase/firestore";
import { DiscoverScreen } from "../screens/DiscoverScreen";

export const Discover = props => {
  const [users, setUsers] = useState([]);

  const handlePress = user => () => {
    props.navigation.navigate("ShowProfile", { userId: user.id });
  };

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
        id: doc.id,
        age: 20,
        address: doc.data().address,
        avatarUrl: doc.data().avatarUrl
      };
    });

    setUsers(users);
  };

  return <DiscoverScreen data={users} onPress={handlePress}></DiscoverScreen>;
};