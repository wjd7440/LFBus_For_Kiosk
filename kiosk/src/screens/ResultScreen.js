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

import { ScrollView } from "react-native-gesture-handler";

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
    // }, 2000);
  }, []);

  return (
    <View style={styles.container}>
      {!loaded ? (
        <Text>로딩중</Text>
      ) : (
        <ScrollView>
          {data[0].itemList.map((rowData, index) => (
            <>
              <Text numberOfLines={1} size={18} color={"#222"}>
                버스 번호 : {rowData.ROUTE_NO}번
              </Text>
              <Text numberOfLines={1} size={18} color={"#222"}>
                잔여 정류장 수 : {rowData.STATUS_POS}개
              </Text>
              <Text numberOfLines={1} size={18} color={"#222"}>
                도착 예정 시간 : {rowData.EXTIME_MIN}분
              </Text>
            </>
          ))}
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center",
  },
});
