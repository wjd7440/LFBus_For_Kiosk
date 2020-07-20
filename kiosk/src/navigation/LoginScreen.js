import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
} from "react-native";
import { NavigationService } from "../common";

class LoginScreen extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="dark-content" />
        <View>
          <Text style={{ fontSize: 25 }}>버스정류장 선택페이지</Text>
        </View>
        <TouchableOpacity
          onPress={() =>
            NavigationService.navigate("저상버스도착현황", {
              screen: "저상버스도착현황",
              info: "information",
            })
          }
          style={{
            justifyContent: "flex-end",
            backgroundColor: "rgb(87,174,198)",
            padding: 20,
            marginTop: 20,
            borderRadius: 30,
          }}
        >
          <Text style={{ fontSize: 20, textAlign: "center", color: "white" }}>
            다음
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center",
  },
});

export default LoginScreen;
