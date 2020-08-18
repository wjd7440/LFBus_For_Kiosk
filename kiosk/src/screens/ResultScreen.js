import React, { useState, useEffect, Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
} from "react-native";
import { NavigationService } from "../common";
import { BUS_INFO_QUERY } from "../Queries";
import axios from "axios";

import { ScrollView } from "react-native-gesture-handler";
import { useQuery } from "react-apollo-hooks";
import { LinearGradient } from "expo-linear-gradient";

import ResultDetailScreen from "./ResultDetailScreen";

export default ({ navigation }) => {
  const [data, setData] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [busses, setBusses] = useState([]);

  const API_KEY =
    "8Ob9wZKBcsyHDD1I%2FlSyl%2B6gkCiD5d%2ByEGpViOo9efKiifmfRRN%2BeZg3WGMxDPVm11UXBGhpJolfP1Zj8BpqDw%3D%3D";
  const parseString = require("react-native-xml2js").parseString;
  const busStationNo = navigation.getParam("busStationNo");

  const dataLoader = () => {
    axios({
      url: `http://openapitraffic.daejeon.go.kr/api/rest/arrive/getArrInfoByStopID?serviceKey=${API_KEY}&BusStopID=${busStationNo}`,
      method: "get",
    }).then((response) => {
      parseString(response.data, function (err, result) {
        // console.log(result);
        const busArriveInfoArray = result.ServiceResult.msgBody;
        setData(busArriveInfoArray);
        setLoaded(true);
      });
    });
  };

  useEffect(() => {
    // let timer = setInterval(() => {
    dataLoader();
    // }, 15000);
  }, [busStationNo]);

  return (
    <View style={styles.container}>
      {!loaded || !data[0] ? (
        <Text>저상버스 도착정보가 없습니다.</Text>
      ) : (
        <ScrollView>
          <LinearGradient colors={["#00427E", "#002548"]}>
            <View style={styles.bitHeaderWrap}>
              <View
                style={{ ...styles.bitHeader, justifyContent: "flex-start" }}
              >
                <Text style={styles.bitHeaderFont}>시청역</Text>
              </View>
              <View style={{ ...styles.bitHeader, justifyContent: "center" }}>
                <Text style={styles.bitHeaderFont}>저상버스안내시스템</Text>
              </View>
              <View style={{ ...styles.bitHeader, justifyContent: "flex-end" }}>
                <Text style={styles.bitHeaderFont}>2020-01-01(수)</Text>
              </View>
            </View>
            <View style={styles.bitHeaderWrap}>
              <View style={{ ...styles.bitHeader, justifyContent: "center" }}>
                <Text style={styles.bitHeaderFont}>시청역</Text>
              </View>
              <View style={{ ...styles.bitHeader, justifyContent: "center" }}>
                <Text style={styles.bitHeaderFont}>저상버스안내시스템</Text>
              </View>
              <View style={{ ...styles.bitHeader, justifyContent: "center" }}>
                <Text style={styles.bitHeaderFont}>2020-01-01(수)</Text>
              </View>
            </View>
          </LinearGradient>
          {data[0].itemList.map((rowData, index) => {
            return (
              <>
                {rowData.CAR_REG_NO && (
                  <ResultDetailScreen
                    CAR_REG_NO={rowData.CAR_REG_NO}
                    ROUTE_NO={rowData.ROUTE_NO}
                    STATUS_POS={rowData.STATUS_POS}
                    EXTIME_MIN={rowData.EXTIME_MIN}
                  />
                )}
              </>
            );
          })}
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  bitHeaderWrap: {
    flex: 1,
    flexDirection: "row",
  },
  bitHeader: {
    position: "relative",
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 20,
    paddingRight: 20,
  },
  bitHeaderFont: {
    color: "white",
    fontSize: 24,
    textShadowColor: "#000",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 4,
    fontWeight: "bold",
  },
  bitHeaderCenter: {
    position: "absolute",
    top: "50%",
    left: "50%",
  },
});
