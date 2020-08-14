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
        const busArriveInfoArray = result.ServiceResult.msgBody;
        setData(busArriveInfoArray);
        setLoaded(true);
      });
    });
  };
  console.log(data[0]);
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
    justifyContent: "center",
  },
});
