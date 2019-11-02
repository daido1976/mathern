import React, { useState, useEffect } from "react";
import { GiftedChat } from "react-native-gifted-chat";

export const ChatScreen = () => {
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

  return (
    <GiftedChat
      messages={messages}
      onSend={messages => onSend(messages)}
      user={{
        _id: 1
      }}
    />
  );
};
