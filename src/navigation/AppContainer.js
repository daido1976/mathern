import { createSwitchNavigator, createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";
import SignInScreen from "../screens/SignInScreen";
import AuthLoadingScreen from "../screens/AuthLoadingScreen";
import ProfileStack from "../screens/ProfileStack";
import DiscoverScreen from "../screens/DiscoverScreen";
import { MessageScreen } from "../screens/MessageScreen";
import EditProfileScreen from "../screens/EditProfileScreen";
import { EditNameScreen } from "../screens/EditNameScreen";

const TabNavigator = createBottomTabNavigator(
  {
    Profile: ProfileStack,
    Discover: DiscoverScreen,
    Message: MessageScreen
  },
  {
    initialRouteName: "Discover"
  }
);

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
  EditProfile: EditProfileScreen,
  EditName: EditNameScreen
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
