import React, { useState, useEffect } from "react";
import firebase from "firebase";
import "firebase/firestore";
import { ChatScreen } from "../screens/ChatScreen";

export const Chat = props => {
  const params = props.navigation.state.params;
  const user = params.user;
  const currentUserId = params.currentUserId;
  const chatId = user.isLikes
    ? currentUserId + user.id
    : user.id + currentUserId;

  const [messages, setMessages] = useState([]);

  const onSend = newMessages => {
    console.log(newMessages);
    setMessages(prevMessages => [...newMessages, ...prevMessages]);
    saveMessages(newMessages);
  };

  const saveMessages = newMessages => {
    try {
      newMessages.forEach(async newMessage => {
        await firebase
          .firestore()
          .collection("chats")
          .doc(chatId)
          .collection("messages")
          .doc(newMessage._id)
          .set({
            createdAt: newMessage.createdAt,
            text: newMessage.text,
            senderId: newMessage.user._id
          })
          .catch(error => alert(error.message));
      });
      console.log("更新に成功しました！");
    } catch (error) {
      console.log(error.toString());
    }
  };

  const getMessages = () => {
    firebase
      .firestore()
      .collection("chats")
      .doc(chatId)
      .collection("messages")
      .orderBy("createdAt", "desc")
      .onSnapshot(querySnapShot => {
        // https://firebase.google.com/docs/firestore/query-data/listen#events-local-changes
        if (querySnapShot.metadata.hasPendingWrites) {
          return null;
        }

        const addedMessages = querySnapShot.docChanges().map(change => {
          if (change.type === "added") {
            console.log("New: ", change.doc.data());
            const avatar =
              change.doc.data().senderId === user.id ? user.avatarUrl : null;

            return {
              _id: change.doc.id,
              text: change.doc.data().text,
              createdAt: change.doc.data().createdAt.toDate(),
              user: {
                _id: change.doc.data().senderId,
                avatar
              }
            };
          }
        });
        setMessages(prevMessages => [...addedMessages, ...prevMessages]);
      });
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
