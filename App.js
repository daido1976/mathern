import React from "react";
import { StyleSheet, Text, View } from "react-native";
import {
  Container,
  Header,
  Body,
  Title,
  Form,
  Input,
  Item,
  Button,
  Label
} from "native-base";

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

export default function App() {
  return (
    <Container style={styles.container}>
      <Header>
        <Body>
          <Title>MUSICiAN</Title>
        </Body>
      </Header>

      <View
        style={{
          flex: 1,
          justifyContent: "center"
        }}
      >
        <Form>
          <Item floatingLabel>
            <Label>Email</Label>
            <Input
              autoCorrect={false}
              autoCapitalize="none"
              // onChangeText={email => this.setState({ email })}
            />
          </Item>

          <Item floatingLabel>
            <Label>Password</Label>
            <Input
              secureTextEntry={true}
              autoCorrect={false}
              autoCapitalize="none"
              // onChangeText={password => this.setState({ password })}
            />
          </Item>

          <Button
            style={{ marginTop: 10 }}
            full
            rounded
            success
            // onPress={() => this.loginUser(this.state.email, this.state.password)}
          >
            <Text style={{ color: "white" }}>Login</Text>
          </Button>

          <Button
            style={{ marginTop: 10 }}
            full
            rounded
            primary
            // onPress={() => this.signUpUser(this.state.email, this.state.password)}
          >
            <Text style={{ color: "white" }}>Sign Up</Text>
          </Button>
        </Form>
      </View>
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff"
  }
});
