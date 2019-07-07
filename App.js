import React from "react";

import {
  createSwitchNavigator,
  createStackNavigator,
  createAppContainer
} from "react-navigation";

import SignInScreen from "./src/screens/SignInScreen";
import AuthLoadingScreen from "./src/screens/AuthLoadingScreen";
import OtherScreen from "./src/screens/OtherScreen";
import HomeScreen from "./src/screens/HomeScreen";

import firebase from "firebase";
import firebaseConfig from "./src/modules/firebaseConfig";

firebase.initializeApp(firebaseConfig);

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}
const AppStack = createStackNavigator({ Home: HomeScreen, Other: OtherScreen });
const AuthStack = createStackNavigator({ SignIn: SignInScreen });

const AppSwitchNavigator = createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    App: AppStack,
    Auth: AuthStack
  },
  {
    initialRouteName: "AuthLoading"
  }
);

const AppContainer = createAppContainer(AppSwitchNavigator);
