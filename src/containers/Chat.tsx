import React, { useState, useEffect } from "react";
import firebase from "firebase";
import "firebase/firestore";
import { ChatScreen } from "../screens/ChatScreen";

export const Chat = props => {
  const params = props.navigation.state.params;
  const [messages, setMessages] = useState([]);

  const onSend = newMessages => {
    setMessages(prevMessages => [...newMessages, ...prevMessages]);
  };

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: "Hello developer",
        createdAt: new Date(),
        user: {
          _id: 2,
          name: "React Native",
          avatar: "https://placeimg.com/140/140/any"
        }
      }
    ]);
  }, []);

  return <ChatScreen messages={messages} onSend={onSend}></ChatScreen>;
};
