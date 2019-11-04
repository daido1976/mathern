import React, { useState, useEffect } from "react";
import { GiftedChat } from "react-native-gifted-chat";

export const ChatScreen = ({ messages, onSend, currenUserId }) => {
  return (
    <GiftedChat
      messages={messages}
      onSend={messages => onSend(messages)}
      user={{
        _id: currenUserId
      }}
      textInputProps={{ autoCapitalize: "none" }}
    />
  );
};
