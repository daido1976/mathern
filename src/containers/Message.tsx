import React, { useState, useEffect } from "react";
import firebase from "firebase";
import "firebase/firestore";
import { MessageScreen } from "../screens/MessageScreen";

export const Message = props => {
  return <MessageScreen></MessageScreen>;
};
