import {
  createSwitchNavigator,
  createStackNavigator,
  createAppContainer,
  createBottomTabNavigator
} from "react-navigation";

import SignInScreen from "../screens/SignInScreen";
import AuthLoadingScreen from "../screens/AuthLoadingScreen";
import ProfileStack from "../screens/ProfileStack";
import DiscoverScreen from "../screens/DiscoverScreen";
import MessageScreen from "../screens/MessageScreen";
import EditProfileScreen from "../screens/EditProfileScreen";

const TabNavigator = createBottomTabNavigator({
  Profile: ProfileStack,
  Discover: DiscoverScreen,
  Message: MessageScreen
});

const HomeStack = createStackNavigator({
  Tabs: {
    screen: TabNavigator,
    navigationOptions: ({ navigation }) => {
      const { routeName } = navigation.state.routes[navigation.state.index];
      return {
        headerTitle: routeName
      };
    }
  },
  EditProfile: EditProfileScreen
});

const AuthStack = createStackNavigator({ SignIn: SignInScreen });

const AppSwitchNavigator = createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    Home: HomeStack,
    Auth: AuthStack
  },
  {
    initialRouteName: "AuthLoading"
  }
);

export default createAppContainer(AppSwitchNavigator);
