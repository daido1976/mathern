import React from "react";
import { StyleSheet, Text, View, StatusBar } from "react-native";
import { Button } from "native-base";
import firebase from "firebase";

export default class OtherScreen extends React.Component {
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#fff"
  }
});
