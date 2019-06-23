import React from "react";
import { StyleSheet, Text, View, StatusBar } from "react-native";
import {
  Container,
  Form,
  Input,
  Item,
  Button,
  Label,
  Spinner
} from "native-base";

import {
  createSwitchNavigator,
  createStackNavigator,
  createAppContainer
} from "react-navigation";

import firebase from "firebase";
import {
  FIREBASE_API_KEY,
  FIREBASE_AUTH_DOMAIN,
  FIREBASE_DATABASE_URL,
  FIREBASE_PROJECT_ID
} from "react-native-dotenv";

// Initialize Firebase
const firebaseConfig = {
  apiKey: FIREBASE_API_KEY,
  authDomain: FIREBASE_AUTH_DOMAIN,
  databaseURL: FIREBASE_DATABASE_URL,
  projectId: FIREBASE_PROJECT_ID
};

firebase.initializeApp(firebaseConfig);

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}

class SignInScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: ""
    };
  }

  static navigationOptions = {
    title: "Please sign in"
  };

  signUpUser = (email, password) => {
    try {
      if (this.state.email == "") {
        alert("Please enter email address");
        return;
      } else if (this.state.password.length < 6) {
        alert("Please enter atleast 6 characters");
        return;
      }
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(user => console.log(user));
      this.props.navigation.navigate("App");
    } catch (error) {
      console.log(error.toString());
    }
  };

  loginUser = (email, password) => {
    try {
      if (this.state.email == "") {
        alert("Please enter email address");
        return;
      } else if (this.state.password.length < 6) {
        alert("Please enter atleast 6 characters");
        return;
      }
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(user => console.log(user));
      this.props.navigation.navigate("App");
    } catch (error) {
      console.log(error.toString());
    }
  };

  render() {
    return (
      <Container style={styles.container}>
        <View>
          <Form>
            <Item floatingLabel>
              <Label>Email</Label>
              <Input
                autoCorrect={false}
                autoCapitalize="none"
                onChangeText={email => this.setState({ email })}
              />
            </Item>

            <Item floatingLabel>
              <Label>Password</Label>
              <Input
                secureTextEntry={true}
                autoCorrect={false}
                autoCapitalize="none"
                onChangeText={password => this.setState({ password })}
              />
            </Item>

            <Button
              style={{ marginTop: 10 }}
              full
              rounded
              success
              onPress={() =>
                this.loginUser(this.state.email, this.state.password)
              }
            >
              <Text style={{ color: "white" }}>Login</Text>
            </Button>

            <Button
              style={{ marginTop: 10 }}
              full
              rounded
              primary
              onPress={() =>
                this.signUpUser(this.state.email, this.state.password)
              }
            >
              <Text style={{ color: "white" }}>Sign Up</Text>
            </Button>
          </Form>
        </View>
      </Container>
    );
  }
}

class HomeScreen extends React.Component {
  static navigationOptions = {
    title: "Welcome to the MUSICiAN!"
  };

  render() {
    return (
      <View style={styles.container}>
        <Button
          style={{ marginTop: 10 }}
          full
          rounded
          info
          onPress={this._showMoreApp}
        >
          <Text style={{ color: "white" }}>Show More</Text>
        </Button>
        <Button
          style={{ marginTop: 10 }}
          full
          rounded
          danger
          onPress={this._signOutAsync}
        >
          <Text style={{ color: "white" }}>Sign Out</Text>
        </Button>
      </View>
    );
  }

  _showMoreApp = () => {
    this.props.navigation.navigate("Other");
  };

  _signOutAsync = async () => {
    await firebase.auth().signOut();
    this.props.navigation.navigate("Auth");
  };
}

class AuthLoadingScreen extends React.Component {
  constructor(props) {
    super(props);
    this._bootstrapAuth();
  }

  _bootstrapAuth = async () => {
    await firebase.auth().onAuthStateChanged(user => {
      if (user != null) {
        console.log(user.email, "is signed in");
        this.props.navigation.navigate("App");
      } else {
        console.log("No user is signed in");
        this.props.navigation.navigate("Auth");
      }
    });
  };

  // Render any loading content that you like here
  render() {
    return (
      <View>
        <Spinner />
        <StatusBar barStyle="default" />
      </View>
    );
  }
}

class OtherScreen extends React.Component {
  static navigationOptions = {
    title: "Lots of features here"
  };

  render() {
    return (
      <View style={styles.container}>
        <Button
          style={{ marginTop: 10 }}
          full
          rounded
          danger
          onPress={this._signOutAsync}
        >
          <Text style={{ color: "white" }}>Sign Out</Text>
        </Button>
        <StatusBar barStyle="default" />
      </View>
    );
  }

  _signOutAsync = async () => {
    await firebase.auth().signOut();
    this.props.navigation.navigate("Auth");
  };
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#fff"
  }
});
