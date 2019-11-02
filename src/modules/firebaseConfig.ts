import { FIREBASE_API_KEY, FIREBASE_PROJECT_ID } from "react-native-dotenv";

// Initialize Firebase
const firebaseConfig = {
  apiKey: FIREBASE_API_KEY,
  authDomain: `${FIREBASE_PROJECT_ID}.firebaseapp.com`,
  databaseURL: `https://${FIREBASE_PROJECT_ID}.firebaseio.com`,
  storageBucket: `${FIREBASE_PROJECT_ID}.appspot.com`,
  projectId: FIREBASE_PROJECT_ID
};

export default firebaseConfig;
