import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
} from "react-native";
import { NavigationService } from "../common";

class ResultScreen extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="dark-content" />
        <View>
          <Text style={{ fontSize: 25 }}>저상버스 도착 현황 페이지</Text>
        </View>
        <TouchableOpacity
          onPress={() => NavigationService.back()}
          style={{
            justifyContent: "flex-end",
            backgroundColor: "rgb(87,174,198)",
            padding: 20,
            marginTop: 20,
            borderRadius: 30,
          }}
        >
          <Text style={{ fontSize: 20, textAlign: "center", color: "white" }}>
            뒤로
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

export default ResultScreen;
