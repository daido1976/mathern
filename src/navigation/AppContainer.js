import {
  createSwitchNavigator,
  createStackNavigator,
  createAppContainer,
  createBottomTabNavigator
} from "react-navigation";

import SignInScreen from "../screens/SignInScreen";
import AuthLoadingScreen from "../screens/AuthLoadingScreen";
import ProfileScreen from "../screens/ProfileScreen";
import DiscoverScreen from "../screens/DiscoverScreen";
import MessageScreen from "../screens/MessageScreen";

const HomeTab = createBottomTabNavigator({
  Profile: ProfileScreen,
  Discover: DiscoverScreen,
  Message: MessageScreen
});
const AuthStack = createStackNavigator({ SignIn: SignInScreen });

const AppSwitchNavigator = createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    Home: HomeTab,
    Auth: AuthStack
  },
  {
    initialRouteName: "AuthLoading"
  }
);

export default createAppContainer(AppSwitchNavigator);
