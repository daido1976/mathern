import { createSwitchNavigator, createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";
import SignInScreen from "../screens/SignInScreen";
import AuthLoadingScreen from "../screens/AuthLoadingScreen";
import ProfileStack from "../screens/ProfileStack";
import { Discover } from "../containers/Discover";
import { Liked } from "../containers/Liked";
import { Message } from "../containers/Message";
import { Chat } from "../containers/Chat";
import { EditProfileScreen } from "../screens/EditProfileScreen";
import { EditNameScreen } from "../screens/EditNameScreen";
import { ProfileDetailScreen } from "../screens/ProfileDetailScreen";

const TabNavigator = createBottomTabNavigator(
  {
    Profile: ProfileStack,
    Discover,
    Liked,
    Message
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
  EditName: EditNameScreen,
  ProfileDetail: ProfileDetailScreen,
  Chat
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
