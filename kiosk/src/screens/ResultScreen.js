import React, { useState, useEffect, Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
} from "react-native";
import { NavigationService } from "../common";
import axios from "axios";

export default ({ navigation }) => {
  const [data, setData] = useState([]);
  const [loaded, setLoaded] = useState(false);

  const API_KEY =
    "8Ob9wZKBcsyHDD1I%2FlSyl%2B6gkCiD5d%2ByEGpViOo9efKiifmfRRN%2BeZg3WGMxDPVm11UXBGhpJolfP1Zj8BpqDw%3D%3D";
  const parseString = require("react-native-xml2js").parseString;
  const busStationNo = navigation.getParam("busStationNo");

  const dataLoader = () => {
    axios({
      url: `http://openapitraffic.daejeon.go.kr/api/rest/arrive/getArrInfoByStopID?serviceKey=${API_KEY}&BusStopID=${busStationNo}`,
      method: "get",
    }).then((response) => {
      setData(response);
      setLoaded(true);
    });
  };

  useEffect(() => {
    dataLoader();
  }, []);

  if (loaded) {
    console.log(data);
  }

  // const data = () => {
  //   return fetch(
  //     `http://openapitraffic.daejeon.go.kr/api/rest/arrive/getArrInfoByStopID?serviceKey=${API_KEY}&BusStopID=${busStationNo}`
  //       .then((response) => response.text())
  //       .then((response) => {
  //         console.log(response);
  //       })
  //   );

  // return fetch(
  //   `http://openapitraffic.daejeon.go.kr/api/rest/arrive/getArrInfoByStopID?serviceKey=${API_KEY}&BusStopID=${busStationNo}`
  // )
  //   .then((response) => response.text())
  //   .then((response) => {
  //     parseString(response, function (err, result) {
  //       const busArriveInfoArray = result.ServiceResult.msgBody;
  //       return busArriveInfoArray;
  //     });
  //   });

  return <View style={styles.container}></View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center",
  },
});
