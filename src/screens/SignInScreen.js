/* eslint-disable react/prop-types */
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Container, Form, Input, Item, Button, Label } from "native-base";
import firebase from "firebase";
import "firebase/firestore";

export default class SignInScreen extends React.Component {
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
        // eslint-disable-next-line no-undef
        alert("Please enter email address");
        return;
      } else if (this.state.password.length < 6) {
        // eslint-disable-next-line no-undef
        alert("Please enter atleast 6 characters");
        return;
      }
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(authData => authData.user.uid)
        .then(id => {
          firebase
            .firestore()
            .collection("users")
            .doc(id)
            .set({
              name: "No Name"
            });
        })
        .then(() => this.props.navigation.navigate("App"));
    } catch (error) {
      console.log(error.toString());
    }
  };

  loginUser = (email, password) => {
    try {
      if (this.state.email == "") {
        // eslint-disable-next-line no-undef
        alert("Please enter email address");
        return;
      } else if (this.state.password.length < 6) {
        // eslint-disable-next-line no-undef
        alert("Please enter atleast 6 characters");
        return;
      }
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(user => console.log(user))
        .then(() => this.props.navigation.navigate("App"));
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#fff"
  }
});
