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
  const [lastCreatedAt, setLastCreatedAt] = useState(null);

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

  const getMessages = async () => {
    const messagesSnapshot = await firebase
      .firestore()
      .collection("chats")
      .doc(chatId)
      .collection("messages")
      .orderBy("createdAt", "desc")
      .get();

    const pastMessages = messagesSnapshot.docs.map(doc => {
      const avatar = doc.data().senderId === user.id ? user.avatarUrl : null;

      return {
        _id: doc.id,
        text: doc.data().text,
        createdAt: doc.data().createdAt.toDate(),
        user: {
          _id: doc.data().senderId,
          avatar
        }
      };
    });

    setMessages(pastMessages);

    const lastMessage = pastMessages[0];
    const lastMessageCreatedAt = lastMessage
      ? lastMessage.createdAt
      : new Date();
    console.log("lastMessage:", lastMessage);
    setLastCreatedAt(lastMessageCreatedAt);
  };

  // I try to listen only new updates.
  // https://stackoverflow.com/questions/53156109/how-to-skip-initial-data-and-trigger-only-new-updates-in-firestore-firebase
  const realTimeUpdateMessage = () => {
    if (!lastCreatedAt) {
      return null;
    }

    console.log("lastCreated:", lastCreatedAt);

    return firebase
      .firestore()
      .collection("chats")
      .doc(chatId)
      .collection("messages")
      .where(
        "createdAt",
        ">",
        // https://firebase.google.com/docs/reference/js/firebase.firestore.Timestamp.html#fromdate
        firebase.firestore.Timestamp.fromDate(lastCreatedAt)
      )
      .orderBy("createdAt", "desc")
      .onSnapshot(querySnapShot => {
        // https://firebase.google.com/docs/firestore/query-data/listen#events-local-changes
        if (querySnapShot.metadata.hasPendingWrites) {
          return null;
        }

        querySnapShot.docChanges().forEach(change => {
          if (change.type === "added") {
            console.log("New: ", change.doc.data());
            const avatar =
              change.doc.data().senderId === user.id ? user.avatarUrl : null;

            const addedMessage = {
              _id: change.doc.id,
              text: change.doc.data().text,
              createdAt: change.doc.data().createdAt.toDate(),
              user: {
                _id: change.doc.data().senderId,
                avatar
              }
            };
            setMessages(prevMessages => [addedMessage, ...prevMessages]);
          }
        });
      });
  };

  useEffect(() => {
    getMessages();
  }, []);

  useEffect(() => {
    const unsubscribe = realTimeUpdateMessage();
    return () => {
      // onSnapshot は null のままの時もあるのでこうしている
      if (unsubscribe != null) unsubscribe();
    };
  }, [lastCreatedAt]);

  return (
    <ChatScreen
      messages={messages}
      onSend={onSend}
      currenUserId={currentUserId}
    ></ChatScreen>
  );
};
