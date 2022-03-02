import React, { useState, useEffect, Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Image,
  ActivityIndicator,
} from "react-native";
import { NavigationService } from "../common";
import { BUS_INFO_QUERY } from "../Queries";
import axios from "axios";
import { ScrollView } from "react-native-gesture-handler";
import { useQuery } from "react-apollo-hooks";
import { LinearGradient } from "expo-linear-gradient";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

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
        <View style={{ ...styles.LoadingBox }}>
          <ActivityIndicator size="large" color="#4B56F1" />
          <Text style={styles.LoadingTxt}>
            실시간 저상버스 정보를 로딩중입니다.
          </Text>
        </View>
      ) : (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <LinearGradient colors={["#00427E", "#002548"]}>
            <View style={styles.Header}>
              <Text style={styles.bitHeaderFont}>{busStationName}</Text>
              <View style={{ ...styles.flexRow, alignItems: "center" }}>
                <Image
                  style={{ ...styles.wheelChair, resizeMode: "contain" }}
                  source={require("../../assets/wheelchair_white.png")}
                />
                <Text style={styles.bitHeaderFont}>저상버스안내시스템</Text>
              </View>
              <View style={{ ...styles.flexRow, justifyContent: "flex-end" }}>
                <Text style={{ ...styles.bitHeaderFont }}>{time}</Text>
              </View>
            </View>
            <View style={{ ...styles.bitHeaderWrap, width: "100%" }}>
              <View style={[styles.busTitleBox, styles.tableCell1]}>
                <Text style={styles.busTitle}>노선번호</Text>
              </View>
              <View style={[styles.busTitleBox, styles.tableCell2]}>
                <Text style={styles.busTitle}>종착지</Text>
              </View>
              <View style={[styles.busTitleBox, styles.tableCell3]}>
                <Text style={styles.busTitle}>예정시간</Text>
              </View>
              <View style={[styles.busTitleBox, styles.tableCell4]}>
                <Text style={styles.busTitle}>버스위치</Text>
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
          {!busExist && (
            <View style={styles.noneBusBox}>
              <Text style={styles.noneBus}>
                현재 저상버스 도착정보가 없습니다.
              </Text>
            </View>
          )}
        </ScrollView>
      )}
    </View>
  );
};

const cell1 = "20%";
const cell2 = "25%";
const cell3 = "20%";
const cell4 = "35%";

const basicDimensions = {
  height: 1115,
  width: 1965.4,
};
const windowWidth = (
  Dimensions.get("screen").width *
  (1 / basicDimensions.width)
).toFixed(2);
const windowHeight = (
  Dimensions.get("screen").height *
  (1 / basicDimensions.height)
).toFixed(2);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  bitHeaderWrap: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  flexRow: {
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
  Header: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomColor: "#ddd",
    borderBottomWidth: 2,
  },
  bitHeaderFont: {
    color: "white",
    fontSize: windowWidth > 768 ? 24 : 32,
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
    borderLeftWidth: 2,
    borderColor: "#ddd",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  },
  busTitle: {
    fontSize: windowWidth > 768 ? 38 : 54,
    fontWeight: "bold",
    color: "white",
    textShadowColor: "#000",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 4,
    textAlign: "center",
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
    width: windowWidth > 768 ? 24 : 32,
    height: windowWidth > 768 ? 24 : 32,
    marginRight: 5,
  },
  LoadingBox: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  LoadingTxt: {
    textAlign: "center",
    fontSize: 28,
    marginTop: 10,
  },
  noneBusBox: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  noneBus: {
    textAlign: "center",
    fontSize: 28,
    marginTop: 10,
  },
});
