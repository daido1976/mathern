import React, { useState, useEffect } from "react";
import firebase from "firebase";
import "firebase/firestore";
import { ChatScreen } from "../screens/ChatScreen";

export const Chat = props => {
  const params = props.navigation.state.params;
  const user = params.user;
  const currentUserId = params.currentUserId;
  const [messages, setMessages] = useState([]);

  const onSend = newMessages => {
    console.log(newMessages);
    setMessages(prevMessages => [...newMessages, ...prevMessages]);
    saveMessage(newMessages[0]);
  };

  const saveMessage = async newMessage => {
    try {
      await firebase
        .firestore()
        .collection("chats")
        // これじゃダメ（相手になった時にも同じ値を指定できるように）
        .doc(user.id + currentUserId)
        .collection("messages")
        .doc(newMessage._id)
        .set({
          createdAt: newMessage.createdAt,
          text: newMessage.text,
          senderId: newMessage.user._id
        })
        .catch(error => alert(error.message));
      console.log("更新に成功しました！");
    } catch (error) {
      console.log(error.toString());
    }
  };

  const getMessages = async () => {
    const messagesSnapshot = await firebase
      .firestore()
      .collection("chats")
      // これじゃダメ（相手になった時にも同じ値を指定できるように）
      .doc(user.id + currentUserId)
      .collection("messages")
      .get();

    if (!currentUserId) {
      return null;
    }

    const prevMessages = messagesSnapshot.docs.map(doc => {
      return {
        _id: doc.id,
        text: doc.data().text,
        createdAt: doc.data().createdAt.toDate(),
        user: {
          _id: doc.data().senderId
        }
      };
    });

    setMessages(prevMessages);
  };

  useEffect(() => {
    getMessages();
  }, []);

  return (
    <ChatScreen
      messages={messages}
      onSend={onSend}
      currenUserId={currentUserId}
    ></ChatScreen>
  );
};
