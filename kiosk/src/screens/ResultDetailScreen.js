import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
} from "react-native";
import { useQuery } from "react-apollo-hooks";
import { BUS_INFO_QUERY } from "../Queries";
import { LinearGradient } from "expo-linear-gradient";

export default ({ CAR_REG_NO, ROUTE_NO, STATUS_POS, EXTIME_MIN }) => {
  const { data, loading } = useQuery(BUS_INFO_QUERY, {
    variables: {
      CAR_REG_NO: CAR_REG_NO[0],
    },
  });

  if (loading) {
    return null;
  } else {
    const {
      KioskBusInfo: { BUS_TYPE },
    } = data;

    if (BUS_TYPE == 2) {
      return (
        <View style={styles.container}>
          <Text numberOfLines={1} size={18} color={"#222"}>
            버스 번호 : {ROUTE_NO}번
          </Text>
          <Text numberOfLines={1} size={18} color={"#222"}>
            잔여 정류장 수 : {STATUS_POS}개
          </Text>
          <Text numberOfLines={1} size={18} color={"#222"}>
            도착 예정 시간 : {EXTIME_MIN}분
          </Text>
        </View>
      );
    } else {
      return null;
    }
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
});
