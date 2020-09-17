import React, { useState, useEffect, Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Image,
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
  const [busExist, setBusExist] = useState(false);

  const API_KEY =
    "8Ob9wZKBcsyHDD1I%2FlSyl%2B6gkCiD5d%2ByEGpViOo9efKiifmfRRN%2BeZg3WGMxDPVm11UXBGhpJolfP1Zj8BpqDw%3D%3D";
  const parseString = require("react-native-xml2js").parseString;
  const busStationNo = navigation.getParam("busStationNo");
  const busStationName = navigation.getParam("busStationName");
  const [time, setTime] = useState({});

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
    let timer = setInterval(() => {
      dataLoader();
    }, 15000);
  }, [busStationNo]);

  useEffect(() => {
    let timer = setInterval(() => {
      const date = new Date().getDate();
      const month = new Date().getMonth() + 1;
      const year = new Date().getFullYear();
      const hours = new Date().getHours();
      const min = new Date().getMinutes();
      if (min > 10) {
        setTime(year + "/" + month + "/" + date + " " + hours + ":" + min);
      } else {
        setTime(
          year + "/" + month + "/" + date + " " + hours + ":" + "0" + min
        );
      }
    }, 15000);
  }, []);

  return (
    <View style={styles.container}>
      {!loaded || !data[0] ? (
        <View style={{ ...styles.noneBus, flex: 1 }}>
          <Text style={styles.noneBus}>실시간 저상버스 정보를 로딩중입니다.</Text>
        </View>
      ) : (
        <ScrollView>
          <LinearGradient colors={["#00427E", "#002548"]}>
            <View style={styles.bitHeaderWrap}>
              <View
                style={{ ...styles.bitHeader, justifyContent: "flex-start" }}
              >
                <Text style={styles.bitHeaderFont}>{busStationName}</Text>
              </View>
              <View style={{ ...styles.bitHeader, justifyContent: "center" }}>
                <Text style={styles.bitHeaderFont}>
                  <Image
                    style={styles.wheelChair}
                    source={require("../../assets/wheelchair_white.png")}
                  />
                  저상버스안내시스템
                </Text>
              </View>
              <View style={{ ...styles.bitHeader, justifyContent: "flex-end" }}>
                <Text style={{ ...styles.bitHeaderFont, fontSize: 21 }}>
                  {time}
                </Text>
              </View>
            </View>
            <View style={{ ...styles.bitHeaderWrap, width: "100%" }}>
              <View style={[styles.busTitleBox, styles.tableCell1]}>
                <Text style={styles.busTitle}>노선번호</Text>
                <Text style={{ ...styles.busTitle, fontSize: 20 }}>Route</Text>
              </View>
              <View style={[styles.busTitleBox, styles.tableCell2]}>
                <Text style={styles.busTitle}>종착지</Text>
                <Text style={{ ...styles.busTitle, fontSize: 20 }}>
                  Destination
                </Text>
              </View>
              <View style={[styles.busTitleBox, styles.tableCell3]}>
                <Text style={styles.busTitle}>예정시간</Text>
                <Text style={{ ...styles.busTitle, fontSize: 20 }}>Minute</Text>
              </View>
              <View style={[styles.busTitleBox, styles.tableCell4]}>
                <Text style={styles.busTitle}>버스위치</Text>
                <Text style={{ ...styles.busTitle, fontSize: 20 }}>
                  Location
                </Text>
              </View>
            </View>
          </LinearGradient>
          {data[0].itemList.map((rowData, index) => {
            return (
              <>
                {rowData.CAR_REG_NO && (
                  <ResultDetailScreen
                    busExist={busExist}
                    setBusExist={setBusExist}
                    CAR_REG_NO={rowData.CAR_REG_NO}
                    ROUTE_NO={rowData.ROUTE_NO}
                    STATUS_POS={rowData.STATUS_POS}
                    EXTIME_MIN={rowData.EXTIME_MIN}
                    DESTINATION={rowData.DESTINATION}
                    ROUTE_TP={rowData.ROUTE_TP}
                  />
                )}
              </>
            );
          })}
          {!busExist && (<Text>현재 저상버스 도착정보가 없습니다.</Text>)}
        </ScrollView>
      )}
    </View>
  );
};

const cell1 = "20%";
const cell2 = "25%";
const cell3 = "20%";
const cell4 = "35%";

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
  busTitleBox: {
    padding: 10,
    borderTopWidth: 2,
    borderLeftWidth: 2,
    borderColor: "#ddd",
    justifyContent: "center",
    alignItems: "center",
  },
  busTitle: {
    fontSize: 56,
    fontWeight: "bold",
    color: "white",
    textShadowColor: "#000",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 4,
  },
  tableCell1: {
    width: cell1,
    borderLeftWidth: 0,
  },
  tableCell2: {
    width: cell2,
  },
  tableCell3: {
    width: cell3,
  },
  tableCell4: {
    width: cell4,
  },
  wheelChair: {
    width: 27,
    height: 27,
    marginRight: 3,
  },
  noneBus: {
    justifyContent: "center",
    alignItems: "center",
    fontSize: 28,
  },
});
