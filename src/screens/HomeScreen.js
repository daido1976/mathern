import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button } from "native-base";
import firebase from "firebase";

export default class HomeScreen extends React.Component {
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#fff"
  }
});
